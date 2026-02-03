-- Favorites System for Trust Your Host
-- Run this script in your Supabase SQL Editor

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Create index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- Create index for faster property lookups
CREATE INDEX IF NOT EXISTS idx_favorites_property ON favorites(property_id);

-- Enable Row Level Security
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own favorites
CREATE POLICY "Users can view own favorites"
  ON favorites
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own favorites
CREATE POLICY "Users can add favorites"
  ON favorites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own favorites
CREATE POLICY "Users can remove favorites"
  ON favorites
  FOR DELETE
  USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON favorites TO authenticated;
GRANT SELECT ON favorites TO anon;
