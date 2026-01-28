'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  
  // Redirect to host login - guests don't need accounts on a directory platform
  useEffect(() => {
    router.replace('/host/login')
  }, [router])
  
  return null
}
