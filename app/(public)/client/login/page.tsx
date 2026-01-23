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

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6.25">
      <h1 className="text-center font-semibold text-[28px]">Entre na sua conta</h1>

      <div className="bg-white rounded-[5px] border p-7.5 gap-2.5 flex flex-col border-[#d7d7d7]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3.75">
            <Input
              label="E-mail"
              placeholder="Insira seu e-mail"
              type="email"
              required
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Senha de acesso"
              type="password"
              placeholder="Insira sua senha"
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
            {loading ? 'Entrando...' : 'Acessar Conta'}
          </button>

          <div className="flex justify-between w-92.5">
            <span className="text-sm leading-5">Ainda não tem uma cadastro?</span>
            <a href="/client/register" className="text-sm font-bold underline leading-5">Cadastre-se</a>
          </div>
        </div>
      </div>


      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </form>

  )
}
