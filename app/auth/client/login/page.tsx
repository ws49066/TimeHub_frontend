'use client'

import { loginSchema } from "@/app/shared/auth/auth.schema"
import { useAuthStore } from "@/app/shared/stores/auth.store"
import { Input } from "@/app/shared/ui/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import z from "zod"

type LoginForm = z.infer<typeof loginSchema>

export default function ClientLogin() {
  const { login, error, loading } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({resolver: zodResolver(loginSchema)})

  async function onSubmit(formData: LoginForm) {

    await login(formData, 'clients')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-xl font-bold">Login Cliente</h1>

      <Input
        label="E-mail"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Senha"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </form>
  )
}
