import { create } from 'zustand'
import { api } from '../api/axios'
import { decodeToken } from '../auth'
import { LoginFormData } from '../auth/auth.schema'
import { User } from '../auth/auth.types'

type AuthState = {
    token: string | null
    user: User | null
    loading: boolean
    error: string | null
    login: (data: LoginFormData, type_user: string) => Promise<void>
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    loading: false,
    error: null,

    login: async ({ email, password }, type_user) => {
        try {
            set({ loading: true, error: null })

            const response = await api.post(`/${type_user}/login`, {
                email,
                password,
            })

            const token = response.data.data.token
            const user = decodeToken(token)

            set({ token, user, loading: false })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            set({
                loading: false,
                error:
                    err.response?.message ||
                    'E-mail ou senha inválidos',
            })
        }
    },

    logout: () => set({ 
        user: null,
        token: null 
    }),
}))
