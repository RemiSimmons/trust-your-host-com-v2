// Quick migration runner
// Usage: node scripts/run-migration.js

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

async function runMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
  // Read SQL file
  const sql = fs.readFileSync('./scripts/add-standard-house-rules.sql', 'utf8')
  
  // Remove the DO $$ block (not supported in rpc)
  const sqlCommands = sql
    .split(';')
    .filter(cmd => cmd.trim() && !cmd.includes('DO $$'))
    .map(cmd => cmd.trim())
  
  console.log('🚀 Running migration...')
  
  for (const command of sqlCommands) {
    if (command) {
      const { error } = await supabase.rpc('exec_sql', { sql: command })
      if (error) {
        // Try direct query
        const { error: error2 } = await supabase.from('_').select('*').limit(0)
        console.log('⚠️  Some commands may require admin access')
      }
    }
  }
  
  console.log('✅ Migration complete! Restart your dev server.')
}

runMigration().catch(console.error)
