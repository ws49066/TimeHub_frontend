'use client'

import { loginSchema } from "@/app/shared/auth/auth.schema"
import { useAuthStore } from "@/app/shared/stores/auth.store"
import { Input } from "@/app/shared/ui/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { useForm } from 'react-hook-form'
import z from "zod"

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
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 flex flex-col mb-6 justify-center items-center">
        <h1 className="text-xl font-semibold md:text-[28px]">Entre na sua conta</h1>
      </div>

      <div className="bg-white rounded-md shadow-sm p-6 space-y-2">

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

        <button
          disabled={loading || !isValid}
          className="w-full bg-black text-white mt-2 rounded font-semibold  h-10 text-sm md:h-11 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#D5D5D5]"
        >
          {loading ? 'Entrando...' : 'Acessar Conta'}
        </button>

        <div className="flex text-xs justify-between mt-2 md:text-sm">
          <span className="">Ainda não tem uma cadastro?</span>
          <a href="/register/client" className="font-bold underline mr-5">Cadastre-se</a>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </form>
  )
}
