'use client'


import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ClientRegisterFormData, clientRegisterSchema } from '../../../../features/clientes'
import { api } from '../../../../shared/api/axios'
import { Input } from '../../../../shared/ui/Input'
import { fetchAddressByCep } from '../../../../shared/services/cep.service'



export default function ClientRegister() {
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
            setError(err.response?.data?.message || 'Error registering client')
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6.25 mb-60 -mt-20">
            <h1 className="text-center font-semibold text-[28px] leading-12.5">Sign up</h1>

            <div className="                           bg-white 
                            rounded-[5px] 
                            border 
                            border-[#d7d7d7]
                            flex 
                            flex-col 
                            gap-2.5
                          p-3 sm:p-4 md:p-7.5">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3.75">
                        <div className='flex flex-col gap-4 sm:flex-row sm:gap-5'>
                            <Input
                                label="First Name"
                                placeholder='e.g.: Jose'
                                required
                                {...register('nome')}
                                error={errors.nome?.message}
                            />

                            <Input
                                label="Last Name"
                                placeholder='e.g.: Lima'
                                required
                                {...register('sobrenome')}
                                error={errors.sobrenome?.message}
                            />
                        </div>

                        <Input
                            label="Email"
                            type="email"
                            placeholder='Enter your email'
                            required
                            {...register('email')}
                            error={errors.email?.message}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder='Enter your password'
                            required
                            {...register('password')}
                            error={errors.password?.message}
                        />

                        <div className="w-full border border-[#d7d7d7]"></div>

                        <Input
                            label="ZIP Code"
                            required
                            placeholder='Enter your ZIP code'
                            {...register('cep', {
                                onBlur: (e) =>
                                    fetchAddressByCep(e.target.value, setValue),
                            })}
                            error={errors.cep?.message}
                        />
                        <Input
                            label="Address"
                            disabled
                            {...register('endereco')}
                        />

                        <Input
                            label="Number"
                            type='number'
                            {...register('numero')}
                        />

                        <Input
                            label="Complement"
                            {...register('complemento')}
                        />

                        <Input
                            label="Neighborhood"
                            disabled
                            {...register('bairro')}
                        />

                        <Input
                            label="City"
                            disabled
                            {...register('cidade')}
                        />

                        <Input
                            label="State"
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
                        Register
                    </button>
                </div>
            </div>


            {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
            )}
        </form>
    )
}
