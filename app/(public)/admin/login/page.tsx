'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import z from "zod"
import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { loginSchema } from "../../../../shared/auth/auth.schema"
import { useAuthStore } from "../../../../shared/stores/auth.store"
import { Logo } from "../../../../shared/components/Logo"
import { Input } from "../../../../shared/ui/Input"

type LoginForm = z.infer<typeof loginSchema>

export default function AdminLogin() {
    const { login, error, loading, user } = useAuthStore()

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    })


    async function onSubmit(formData: LoginForm) {

        await login(formData, 'administrator', 'admin')
    }

    useEffect(() => {
        if (!user) return


        router.replace('/agendamentos')
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7.5">
            <div className="flex flex-col items-center">
                <Logo width={57.7} height={57.7} />
            </div>

            <h1 className="text-center font-semibold text-[28px] py-1">Admin Login</h1>


            <div className="bg-white rounded-[5px] p-7.5 gap-2.5 border border-[#D7D7D7]">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3.75">

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            {...register('email')}
                            error={errors.email?.message}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            {...register('password')}
                            error={errors.password?.message}
                        />
                    </div>

                    <button
                        disabled={loading || !isValid}
                        className="
                            w-full 
                            bg-black 
                            text-white 
                            py-2.5
                            px-26
                            rounded-[5px]
                            font-semibold  
                            text-[16px]
                            h-11 
                            disabled:opacity-50 
                            disabled:cursor-not-allowed 
                            disabled:bg-[#D5D5D5]"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>

            </div>


            {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
            )}
        </form>
    )
}
