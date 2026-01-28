'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  
  // Redirect to property submission - this is how hosts create accounts
  useEffect(() => {
    router.replace('/submit-property')
  }, [router])
  
  return null
}
