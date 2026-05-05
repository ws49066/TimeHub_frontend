import { create } from 'zustand'
import { api } from '../api/axios'
import { decodeToken } from '../auth'
import { LoginFormData } from '../auth/auth.schema'
import { User } from '../auth/auth.types'
import { tokenService } from '../auth/token'

type AuthState = {
    user: User | null
    loading: boolean
    loadingToken: boolean
    error: string | null
    login: (data: LoginFormData, type_user: string, role?: string) => Promise<void>
    hydrate: () => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    loading: false,
    loadingToken: true,
    error: null,

    login: async ({ email, password }, type_user = 'admin', role) => {
        try {
            set({ loading: true, error: null })

            const response = await api.post(`/${type_user}/login`, {
                email,
                password,
                role
            })

            const token = response.data.data.token

            tokenService.set(token)

            const user = decodeToken(token)

            set({ user, loading: false })


            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error('Login error:', err)
            set({
                loading: false,
                error:
                    err.response?.data.message ||
                    'Invalid email or password',
            })
        }
    },

    hydrate: () => {
        const token = tokenService.get()

        if (!token) {
            set({ user: null, loadingToken: false })
            return
        }

        try {
            const user = decodeToken(token)
            set({ user, loadingToken: false })
        } catch {
            tokenService.remove()
            set({ user: null, loadingToken: false })
        }
    },

    logout: () => {
        tokenService.remove()

        set({
            user: null
        })
    }

}))
