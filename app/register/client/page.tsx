'use client'


import { Input } from '@/shared/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ClientRegisterFormData, clientRegisterSchema } from '@/shared/client/client.schema'
import { fetchAddressByCep } from '@/shared/services/cep.service'
import { api } from '@/shared/api/axios'
import { useState } from 'react'


export default function ClientRegister() {
    // const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<ClientRegisterFormData>({
        resolver: zodResolver(clientRegisterSchema),
        mode: 'onChange',
    })

    async function onSubmit(data: ClientRegisterFormData) {
        try {
            await api.post('/clients/register', data)

            router.push('/auth/client/login')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao cadastrar cliente')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 flex flex-col mb-6 justify-center items-center">
                <h1 className="text-xl font-semibold md:text-[28px]">Cadastre-se</h1>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 space-y-3">

                <Input
                    label="Nome"
                    required
                    {...register('nome')}
                    error={errors.nome?.message}
                />

                <Input
                    label="Sobrenome"
                    required
                    {...register('sobrenome')}
                    error={errors.sobrenome?.message}
                />

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
                    required
                    {...register('password')}
                    error={errors.password?.message}
                />

                <Input
                    label="CEP"
                    required
                    {...register('cep', {
                        onBlur: (e) =>
                            fetchAddressByCep(e.target.value, setValue),
                    })}
                    error={errors.cep?.message}
                />
                <Input
                    label="Endereço"
                    disabled
                    {...register('endereco')}
                />

                <Input
                    label="Número"
                    type='number'
                    {...register('numero')}
                />

                <Input
                    label="Complemento"
                    {...register('complemento')}
                />

                <Input
                    label="Bairro"
                    disabled
                    {...register('bairro')}
                />

                <Input
                    label="Cidade"
                    disabled
                    {...register('cidade')}
                />

                <Input
                    label="Estado"
                    disabled
                    {...register('estado')}
                />

                <button
                    disabled={!isValid}
                    className="w-full bg-black text-white mt-4 rounded font-semibold h-11 disabled:opacity-50"
                >
                    Cadastrar-se
                </button>
            </div>
            {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
            )}
        </form>
    )
}
