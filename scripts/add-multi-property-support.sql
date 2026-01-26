-- ============================================
-- Multi-Property Support - Database Migration
-- ============================================
-- Enables hosts to manage multiple properties under one account
-- with volume pricing ($49 first, $39 each additional)

-- ============================================
-- 1. Property Change Requests Table
-- ============================================
-- Tracks pending changes that require admin approval

CREATE TABLE IF NOT EXISTS property_change_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  host_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  requested_changes JSONB NOT NULL,
  current_values JSONB, -- Snapshot of current values for comparison
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  admin_notes TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES profiles(id),
  
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_change_requests_status ON property_change_requests(status);
CREATE INDEX IF NOT EXISTS idx_change_requests_property ON property_change_requests(property_id);
CREATE INDEX IF NOT EXISTS idx_change_requests_host ON property_change_requests(host_id);
CREATE INDEX IF NOT EXISTS idx_change_requests_pending ON property_change_requests(status, requested_at) WHERE status = 'pending';

-- Comments
COMMENT ON TABLE property_change_requests IS 'Tracks property changes that require admin approval before going live';
COMMENT ON COLUMN property_change_requests.requested_changes IS 'JSONB object with fields to be changed (e.g., {"name": "New Name", "address": "123 Main St"})';
COMMENT ON COLUMN property_change_requests.current_values IS 'Snapshot of values before change for comparison view';

-- ============================================
-- 2. Update Properties Table for Multi-Property
-- ============================================

-- Ensure owner_id/host_id is properly indexed
CREATE INDEX IF NOT EXISTS idx_properties_host_id ON properties(host_id);

-- Add property count tracking (optional, for quick lookups)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS property_count INTEGER DEFAULT 0;

-- Function to update property count
CREATE OR REPLACE FUNCTION update_host_property_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles 
    SET property_count = property_count + 1 
    WHERE id = NEW.host_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles 
    SET property_count = property_count - 1 
    WHERE id = OLD.host_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update property count
DROP TRIGGER IF EXISTS trigger_update_property_count ON properties;
CREATE TRIGGER trigger_update_property_count
AFTER INSERT OR DELETE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_host_property_count();

-- Initialize property counts for existing hosts
UPDATE profiles p
SET property_count = (
  SELECT COUNT(*) 
  FROM properties 
  WHERE host_id = p.id
);

-- ============================================
-- 3. Subscription Pricing Logic
-- ============================================

-- Add columns for multi-property subscription tracking
ALTER TABLE properties ADD COLUMN IF NOT EXISTS is_primary_property BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS monthly_amount DECIMAL(10,2);

-- Function to determine if property is host's first (primary) property
CREATE OR REPLACE FUNCTION is_primary_property(p_host_id UUID, p_property_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  property_count INTEGER;
  is_oldest BOOLEAN;
BEGIN
  -- Count how many properties this host has
  SELECT COUNT(*) INTO property_count
  FROM properties
  WHERE host_id = p_host_id;
  
  -- If only one property, it's primary
  IF property_count = 1 THEN
    RETURN true;
  END IF;
  
  -- Check if this is the oldest property (first created)
  SELECT (id = p_property_id) INTO is_oldest
  FROM properties
  WHERE host_id = p_host_id
  ORDER BY created_at ASC
  LIMIT 1;
  
  RETURN is_oldest;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate subscription amount for a property
CREATE OR REPLACE FUNCTION calculate_property_subscription_amount(p_host_id UUID, p_property_id UUID)
RETURNS DECIMAL AS $$
DECLARE
  is_first BOOLEAN;
BEGIN
  is_first := is_primary_property(p_host_id, p_property_id);
  
  IF is_first THEN
    RETURN 49.00;
  ELSE
    RETURN 39.00;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Update existing properties with correct amounts
UPDATE properties
SET 
  is_primary_property = is_primary_property(host_id, id),
  monthly_amount = calculate_property_subscription_amount(host_id, id);

-- ============================================
-- 4. Combined Analytics View
-- ============================================

-- View to aggregate analytics across all host properties
-- Note: Analytics data comes from property_clicks table, not stored in properties
-- Keeping this simple - only using columns we know exist
CREATE OR REPLACE VIEW host_aggregate_analytics AS
SELECT 
  p.host_id,
  COUNT(p.id) as total_properties,
  SUM(COALESCE(p.monthly_amount, 49.00)) as total_monthly_cost,
  MIN(p.created_at) as first_property_date
FROM properties p
GROUP BY p.host_id;

COMMENT ON VIEW host_aggregate_analytics IS 'Aggregated property stats for hosts. Click/view analytics come from property_clicks table.';

-- ============================================
-- 5. RLS Policies
-- ============================================

-- Enable RLS on property_change_requests
ALTER TABLE property_change_requests ENABLE ROW LEVEL SECURITY;

-- Hosts can view their own change requests
CREATE POLICY "Hosts can view own change requests"
ON property_change_requests
FOR SELECT
USING (auth.uid() = host_id);

-- Hosts can create change requests for their properties
CREATE POLICY "Hosts can create change requests"
ON property_change_requests
FOR INSERT
WITH CHECK (auth.uid() = host_id);

-- Admins can view all change requests
-- (Assumes you have an admin role check function)
CREATE POLICY "Admins can manage all change requests"
ON property_change_requests
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- ============================================
-- 6. Helper Functions
-- ============================================

-- Function to get host's total monthly subscription cost
CREATE OR REPLACE FUNCTION get_host_total_monthly_cost(p_host_id UUID)
RETURNS DECIMAL AS $$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(monthly_amount), 0)
    FROM properties
    WHERE host_id = p_host_id
    AND subscription_status IN ('trial', 'active')
  );
END;
$$ LANGUAGE plpgsql;

-- Function to approve change request and apply changes
CREATE OR REPLACE FUNCTION approve_change_request(
  p_request_id UUID,
  p_admin_id UUID,
  p_admin_notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_property_id UUID;
  v_changes JSONB;
BEGIN
  -- Get request details
  SELECT property_id, requested_changes
  INTO v_property_id, v_changes
  FROM property_change_requests
  WHERE id = p_request_id AND status = 'pending';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Change request not found or already processed';
  END IF;
  
  -- Apply changes to property
  -- Note: In production, you'd iterate through v_changes and update each field
  -- For now, we'll use a simple jsonb_populate_record approach
  UPDATE properties
  SET 
    name = COALESCE(v_changes->>'name', name),
    property_type = COALESCE(v_changes->>'property_type', property_type),
    location = COALESCE((v_changes->>'location')::JSONB, location),
    capacity = COALESCE((v_changes->>'capacity')::JSONB, capacity),
    updated_at = NOW()
  WHERE id = v_property_id;
  
  -- Mark request as approved
  UPDATE property_change_requests
  SET 
    status = 'approved',
    reviewed_at = NOW(),
    reviewed_by = p_admin_id,
    admin_notes = p_admin_notes
  WHERE id = p_request_id;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Function to reject change request
CREATE OR REPLACE FUNCTION reject_change_request(
  p_request_id UUID,
  p_admin_id UUID,
  p_admin_notes TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE property_change_requests
  SET 
    status = 'rejected',
    reviewed_at = NOW(),
    reviewed_by = p_admin_id,
    admin_notes = p_admin_notes
  WHERE id = p_request_id AND status = 'pending';
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Success Message
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Multi-property support migration complete!';
  RAISE NOTICE '✅ Created: property_change_requests table';
  RAISE NOTICE '✅ Added: property count tracking';
  RAISE NOTICE '✅ Added: subscription amount calculation';
  RAISE NOTICE '✅ Created: host_aggregate_analytics view';
  RAISE NOTICE '✅ Added: approval/rejection functions';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Pricing Structure:';
  RAISE NOTICE '   • First property: $49/month (60-day trial)';
  RAISE NOTICE '   • Additional: $39/month each (no trial)';
  RAISE NOTICE '';
  RAISE NOTICE '⚙️  Next Steps:';
  RAISE NOTICE '   1. Create STRIPE_ADDITIONAL_PRICE_ID in Stripe ($39/month)';
  RAISE NOTICE '   2. Add STRIPE_ADDITIONAL_PRICE_ID to environment variables';
  RAISE NOTICE '   3. Test multi-property submission flow';
END $$;
