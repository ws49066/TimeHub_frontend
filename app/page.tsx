'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../shared/stores/auth.store'

export default function Page() {
  const router = useRouter()

  const user = useAuthStore((state) => state.user)

  useEffect(() => {

    if (!user) {
      router.replace('/auth/client/login')
      return
    }

    router.replace('/agendamentos')
    return


  }, [user, router])

  return null
}
