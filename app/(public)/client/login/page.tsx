'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { useForm } from 'react-hook-form'
import z from "zod"
import { loginSchema } from "../../../../shared/auth/auth.schema"
import { useAuthStore } from "../../../../shared/stores/auth.store"
import { Input } from "../../../../shared/ui/Input"

type LoginForm = z.infer<typeof loginSchema>

export default function ClientLogin() {
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

    await login(formData, 'clients')
  }

  useEffect(() => {
    if (!user) return


    router.replace('/agendamentos')
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 sm:gap-6.25">
      <h1 className="text-center font-semibold text-[28px]">Sign in to your account</h1>

      <div className="bg-white rounded-[5px] border p-4 sm:p-6 md:p-7.5gap-2.5 flex flex-col border-[#d7d7d7]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3.75">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
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

          <div className="flex flex-col gap-4">
            <div className="flex relative items-center gap-2 lg:gap-25 ">
              <span className="text-sm">Don't have an account yet?</span>
              <a href="/client/register" className="left-67.5 text-sm font-bold underline">Sign up</a>
            </div>
            
            <div className="border-t border-[#d7d7d7] pt-4">
              <a 
                href="/admin/login" 
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#f5f5f5] border border-[#d7d7d7] rounded-[5px] text-sm font-semibold text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 ease-in-out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Sign in as Admin
              </a>
            </div>
          </div>
        </div>
      </div>


      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </form>

  )
}
