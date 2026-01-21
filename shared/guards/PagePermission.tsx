'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/shared/stores/auth.store'
import { IPermissions } from '@/shared/auth/auth.types'

type Props = {
  children: React.ReactNode
  permission?: keyof IPermissions
}

export function PagePermissionGuard({ children, permission }: Props) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const loadingToken = useAuthStore((state) => state.loadingToken)


  useEffect(() => {

    if (loadingToken) return

    if (!user) {
      router.replace('/auth/client/login')
      return
    }

  }, [user, loadingToken, permission, router])

  if (loadingToken) return null

  return <>{children}</>
}
