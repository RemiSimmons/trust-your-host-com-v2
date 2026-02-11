import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Skip auth redirect logic entirely for auth callback routes
  if (request.nextUrl.pathname.startsWith("/auth/callback")) {
    return supabaseResponse
  }

  // Define all routes that require authentication
  const protectedPaths = ['/dashboard', '/host', '/admin']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Allow public auth-related paths even if they start with a protected prefix
  const isAuthPath = 
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup") ||
    request.nextUrl.pathname.startsWith("/auth") ||
    request.nextUrl.pathname === "/host/login" ||
    request.nextUrl.pathname === "/host/signup"

  if (!user && isProtectedPath && !isAuthPath) {
    // no user, redirect to the appropriate login page
    const url = request.nextUrl.clone()
    url.pathname = request.nextUrl.pathname.startsWith("/host") ? "/host/login" : "/login"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
