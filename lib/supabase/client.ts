import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials not configured. Using mock client.")
    return {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
        eq: function () {
          return this
        },
        single: function () {
          return this
        },
        limit: function () {
          return this
        },
        order: function () {
          return this
        },
      }),
      auth: {
        getUser: () =>
          Promise.resolve({
            data: {
              user: {
                id: "mock-admin-id",
                email: "admin@trustyourhost.com",
                role: "authenticated",
                user_metadata: { role: "admin" },
              },
            },
            error: null,
          }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () =>
          Promise.resolve({ data: { user: { id: "mock-admin-id" }, session: {} }, error: null }),
        signUp: () => Promise.resolve({ data: { user: { id: "mock-admin-id" }, session: {} }, error: null }),
      },
    } as any
  }

  return createSupabaseBrowserClient(supabaseUrl, supabaseKey)
}
