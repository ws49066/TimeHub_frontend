'use client'

import { loginSchema } from "@/app/shared/auth/auth.schema"
import { useAuthStore } from "@/app/shared/stores/auth.store"
import { Input } from "@/app/shared/ui/Input"
import { Logo } from "@/app/shared/ui/Logo"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import z from "zod"

type LoginForm = z.infer<typeof loginSchema>

export default function AdminLogin() {
    const { login, error, loading } = useAuthStore()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })


    async function onSubmit(formData: LoginForm) {

        await login(formData, 'administrator')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="space-y-6 flex flex-col mb-6 justify-center items-center">
                <Logo />
                <h1 className="text-2xl font-semibold">Login Admin</h1>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 space-y-3">

                <Input
                    label="E-mail"
                    type="email"
                    required
                    {...register('email')}
                    error={errors.email?.message}
                />

                <Input
                    label="Senha de acesso"
                    type="password"
                    stylesOverride="text-3xl"
                    required
                    {...register('password')}
                    error={errors.password?.message}
                />

                <button
                    disabled={loading}
                    className="w-full bg-black text-white p-3 mt-2 rounded font-medium"
                >
                    {loading ? 'Entrando...' : 'Acessar Conta'}
                </button>
            </div>


            {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
            )}
        </form>
    )
}
