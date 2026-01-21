'use client'


import { Input } from '@/shared/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ClientRegisterFormData, clientRegisterSchema } from '@/shared/client/client.schema'
import { fetchAddressByCep } from '@/shared/services/cep.service'
import { api } from '@/shared/api/axios'
import { useEffect, useState } from 'react'
import { PagePermissionGuard } from '@/shared/guards/PagePermission'
import MainLayout from '@/shared/components/Layout/MainLayout'


export default function ClientRegister() {
    // const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isValid },
    } = useForm<ClientRegisterFormData>({
        resolver: zodResolver(clientRegisterSchema),
        mode: 'onChange',
    })



    useEffect(() => {
        async function fetchClientInfo() {
            try {
                const response = await api.get('/clients/info')

                reset(response.data.data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchClientInfo()
    }, [reset])


    async function onSubmit(data: ClientRegisterFormData) {
        try {
            await api.put('/clients/edit', data)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao cadastrar cliente')
        }
    }

    return (
        <PagePermissionGuard permission="access_system">
            <MainLayout
                title="Minha conta"
                description="Ajuste informações da sua conta de forma simples"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            // disabled={!isValid}
                            className="w-full bg-black text-white mt-4 rounded font-semibold h-11 disabled:opacity-50"
                        >
                            Salvar
                        </button>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                </form>


            </MainLayout>
        </PagePermissionGuard>
    )
}
