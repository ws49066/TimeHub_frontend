'use client'


import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ClientRegisterFormData, clientRegisterSchema } from '../../../../shared/client/client.schema'
import { api } from '../../../../shared/api/axios'
import { Input } from '../../../../shared/ui/Input'
import { fetchAddressByCep } from '../../../../shared/services/cep.service'



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

            router.push('/client/login')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao cadastrar cliente')
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6.25 mb-60">
            <h1 className="text-center font-semibold text-[28px] leading-12.5">Cadastre-se</h1>

            <div className="bg-white rounded-[5px] border p-7.5 gap-2.5 flex flex-col border-[#d7d7d7]">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3.75">
                        <div className='flex gap-5'>
                            <Input
                                label="Nome"
                                placeholder='ex.: Jose'
                                required
                                {...register('nome')}
                                error={errors.nome?.message}
                            />

                            <Input
                                label="Sobrenome"
                                placeholder='ex.: Lima'
                                required
                                {...register('sobrenome')}
                                error={errors.sobrenome?.message}
                            />
                        </div>

                        <Input
                            label="E-mail"
                            type="email"
                            placeholder='Insira seu e-mail'
                            required
                            {...register('email')}
                            error={errors.email?.message}
                        />

                        <Input
                            label="Senha de acesso"
                            type="password"
                            placeholder='Insira sua senha'
                            required
                            {...register('password')}
                            error={errors.password?.message}
                        />

                        <div className="w-full border border-[#d7d7d7]"></div>

                        <Input
                            label="CEP"
                            required
                            placeholder='Insira seu CEP'
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
                    </div>

                    <button
                        disabled={!isValid}
                        className="
                            w-full 
                            bg-black 
                            text-white
                            leading-6 
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
                        Cadastrar-se
                    </button>
                </div>
            </div>


            {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
            )}
        </form>
    )
}
