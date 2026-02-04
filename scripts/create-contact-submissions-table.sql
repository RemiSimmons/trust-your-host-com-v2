-- ============================================
-- Contact Submissions Table
-- Optional enhancement for contact form
-- Stores all contact form submissions for audit trail and admin management
-- ============================================

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Status Management
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'closed')),
  admin_notes TEXT,
  
  -- Email Integration
  resend_email_id TEXT, -- ID from Resend API for tracking
  admin_email_sent BOOLEAN DEFAULT TRUE,
  user_confirmation_sent BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES profiles(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_resolved_at ON contact_submissions(resolved_at DESC) WHERE resolved_at IS NOT NULL;

-- Create full-text search index for searching submissions
CREATE INDEX IF NOT EXISTS idx_contact_submissions_search ON contact_submissions USING gin(
  to_tsvector('english', name || ' ' || email || ' ' || subject || ' ' || message)
);

-- Enable RLS (Row Level Security)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view and manage contact submissions
CREATE POLICY "Admins can view all contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "System can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_contact_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_submissions_updated_at();

-- Create trigger to set resolved_at when status changes to 'resolved' or 'closed'
CREATE OR REPLACE FUNCTION set_contact_submissions_resolved_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IN ('resolved', 'closed') AND OLD.status NOT IN ('resolved', 'closed') THEN
    NEW.resolved_at = NOW();
    NEW.resolved_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_resolved_at_trigger
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  WHEN (NEW.status IS DISTINCT FROM OLD.status)
  EXECUTE FUNCTION set_contact_submissions_resolved_at();

-- Create view for admin dashboard analytics
CREATE OR REPLACE VIEW contact_submissions_analytics AS
SELECT 
  COUNT(*) as total_submissions,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
  COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_count,
  COUNT(*) FILTER (WHERE status = 'resolved') as resolved_count,
  COUNT(*) FILTER (WHERE status = 'closed') as closed_count,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as submissions_last_24h,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as submissions_last_7d,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as submissions_last_30d,
  AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 3600) FILTER (WHERE resolved_at IS NOT NULL) as avg_resolution_time_hours
FROM contact_submissions;

-- Grant permissions
GRANT SELECT ON contact_submissions_analytics TO authenticated;

-- Comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores all contact form submissions for audit trail and management';
COMMENT ON COLUMN contact_submissions.status IS 'Current status: pending, in_progress, resolved, closed';
COMMENT ON COLUMN contact_submissions.resend_email_id IS 'Email ID from Resend API for tracking delivery';
COMMENT ON COLUMN contact_submissions.ip_address IS 'IP address of submitter for spam detection';
COMMENT ON COLUMN contact_submissions.resolved_at IS 'Timestamp when submission was marked as resolved/closed';
