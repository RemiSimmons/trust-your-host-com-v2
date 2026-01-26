-- TrustYourHost Directory Model - Database Migration
-- Transforms booking platform into property directory with click tracking

-- New Tables for Directory Model

-- Property Submissions (pending approval)
CREATE TABLE IF NOT EXISTS public.property_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Host Information
  host_name TEXT NOT NULL,
  host_email TEXT NOT NULL,
  host_phone TEXT,
  
  -- Property Details
  property_name TEXT NOT NULL,
  external_booking_url TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL DEFAULT 'USA',
  
  -- Property Attributes
  experiences TEXT[] DEFAULT '{}',
  property_type TEXT NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  nightly_rate_min NUMERIC(10, 2),
  nightly_rate_max NUMERIC(10, 2),
  max_guests INTEGER,
  amenities TEXT[] DEFAULT '{}',
  
  -- FIFA 2026 Flag
  available_for_fifa_2026 BOOLEAN DEFAULT false,
  
  -- Status Tracking
  status TEXT DEFAULT 'pending',
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Click Tracking
CREATE TABLE IF NOT EXISTS public.property_clicks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  
  -- Click Metadata
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  
  -- Geographic Data
  ip_address INET,
  city TEXT,
  region TEXT,
  country TEXT,
  
  -- Device Info
  device_type TEXT,
  browser TEXT,
  
  -- Session Tracking
  session_id TEXT
);

-- Subscription Analytics (monthly aggregates)
CREATE TABLE IF NOT EXISTS public.subscription_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  month DATE NOT NULL,
  
  total_clicks INTEGER DEFAULT 0,
  unique_sessions INTEGER DEFAULT 0,
  top_referrers JSONB DEFAULT '[]',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  UNIQUE(property_id, month)
);

-- Modify Existing Properties Table
ALTER TABLE public.properties 
  ADD COLUMN IF NOT EXISTS external_booking_url TEXT,
  ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trial',
  ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS total_clicks INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_fifa_2026 BOOLEAN DEFAULT false;

-- Modify Profiles Table for Host-Only Model
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT;

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_property_clicks_property_id ON public.property_clicks(property_id);
CREATE INDEX IF NOT EXISTS idx_property_clicks_clicked_at ON public.property_clicks(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.property_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON public.property_submissions(created_at DESC);

-- RLS Policies

ALTER TABLE public.property_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_analytics ENABLE ROW LEVEL SECURITY;

-- Submissions: Only admins can view all, anyone can insert
CREATE POLICY "Anyone can submit properties"
  ON public.property_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all submissions"
  ON public.property_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update submissions"
  ON public.property_submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Clicks: Only property owners can view their own clicks
CREATE POLICY "Hosts can view clicks for their properties"
  ON public.property_clicks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = property_clicks.property_id 
      AND properties.host_id = auth.uid()
    )
  );

-- Analytics: Only property owners can view
CREATE POLICY "Hosts can view their analytics"
  ON public.subscription_analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = subscription_analytics.property_id 
      AND properties.host_id = auth.uid()
    )
  );

-- Database Function for Atomic Click Increment
CREATE OR REPLACE FUNCTION increment_property_clicks(property_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE properties 
  SET total_clicks = COALESCE(total_clicks, 0) + 1 
  WHERE id = property_uuid;
END;
$$ LANGUAGE plpgsql;
