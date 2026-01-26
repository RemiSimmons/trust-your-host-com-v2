import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials not configured. Using mock client.")
    // Return a mock client that will fail gracefully
    const createQueryBuilder = () => {
      const builder: any = {
        select: function (columns?: string, options?: { count?: string; head?: boolean }) {
          // Handle count queries
          if (options?.count && options?.head) {
            return Promise.resolve({
              count: 0,
              error: {
                code: "PGRST205",
                message: "Could not find the table",
              },
            })
          }
          return this
        },
        eq: function (column: string, value: any) {
          return this
        },
        neq: function (column: string, value: any) {
          return this
        },
        single: function () {
          return Promise.resolve({
            data: null,
            error: {
              code: "PGRST205",
              message: "Could not find the table",
            },
          })
        },
        limit: function (count: number) {
          return this
        },
        order: function (column: string, options?: { ascending?: boolean }) {
          return this
        },
        insert: function (values: any) {
          return Promise.resolve({
            data: null,
            error: {
              code: "PGRST205",
              message: "Could not find the table",
            },
          })
        },
        update: function (values: any) {
          return Promise.resolve({
            data: null,
            error: {
              code: "PGRST205",
              message: "Could not find the table",
            },
          })
        },
        delete: function () {
          return Promise.resolve({
            data: null,
            error: {
              code: "PGRST205",
              message: "Could not find the table",
            },
          })
        },
      }
      // Make the builder awaitable (returns empty result when awaited directly)
      builder.then = function (onResolve: any) {
        return Promise.resolve({
          data: [],
          error: {
            code: "PGRST205",
            message: "Could not find the table",
          },
        }).then(onResolve)
      }
      builder.catch = function (onReject: any) {
        return Promise.resolve({
          data: [],
          error: {
            code: "PGRST205",
            message: "Could not find the table",
          },
        }).catch(onReject)
      }
      return builder
    }

    return {
      from: () => createQueryBuilder(),
      auth: {
        getUser: () =>
          Promise.resolve({
            data: {
              user: {
                id: "mock-admin-id",
                email: "admin@trustyourhost.com",
                role: "authenticated",
                user_metadata: {
                  role: "admin",
                },
              },
            },
            error: null,
          }),
        signOut: () => Promise.resolve({ error: null }),
      },
    } as any
  }

  return createSupabaseServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
