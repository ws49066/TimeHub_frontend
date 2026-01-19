'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token) {
      router.replace('/auth/client/login')
      return
    }

    if (role === 'admin') {
      router.replace('/admin/dashboard')
      return
    }

    if (role === 'client') {
      router.replace('/client/home')
      return
    }

    router.replace('/auth/client/login')
  }, [router])

  return null
}
