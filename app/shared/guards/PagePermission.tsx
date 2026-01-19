'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/shared/stores/auth.store'
import { IPermissions } from '@/app/shared/auth/auth.types'

type Props = {
  children: React.ReactNode
  permission?: keyof IPermissions
}

export function PagePermissionGuard({ children, permission }: Props) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const loadingToken = useAuthStore((state) => state.loadingToken)

  console.log('User in PagePermissionGuard:', user)

  useEffect(() => {
    console.log('Checking permissions for user:', user)
    console.log('Loading state:', loadingToken)
    if (loadingToken) return

    if (!user) {
      router.replace('/auth/client/login')
      return
    }

    if (user.role === "client" && permission && !user.permissions?.[permission]) {
      router.replace('/403')
    }
  }, [user, loadingToken, permission, router])

  if (loadingToken) return null

  return <>{children}</>
}
