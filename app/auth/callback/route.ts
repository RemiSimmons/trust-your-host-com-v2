import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const nextParam = requestUrl.searchParams.get('next') || '/host'

  // Prevent open redirect attacks - only allow relative paths starting with allowed prefixes
  const allowedRedirectPrefixes = ['/host', '/admin', '/dashboard', '/']
  const isValidRedirect = 
    nextParam.startsWith('/') && 
    !nextParam.startsWith('//') && 
    !nextParam.includes('://') &&
    allowedRedirectPrefixes.some(prefix => nextParam.startsWith(prefix))
  const safeRedirect = isValidRedirect ? nextParam : '/host'

  if (code) {
    const supabase = await createServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Get user to check their role
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Fetch user profile to check role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        
        // If admin, redirect to admin panel
        if (profile?.role === 'admin') {
          return NextResponse.redirect(new URL('/admin', requestUrl.origin))
        }
      }
      
      // Redirect to the intended destination (or /host for hosts)
      return NextResponse.redirect(new URL(safeRedirect, requestUrl.origin))
    }
  }

  // If there's an error or no code, redirect to login
  return NextResponse.redirect(new URL('/host/login?error=auth_failed', requestUrl.origin))
}
