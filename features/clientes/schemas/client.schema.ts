import { z } from 'zod'

export const clientRegisterSchema = z.object({
  nome: z.string().min(1, 'First name is required'),
  sobrenome: z.string().min(1, 'Last name is required'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email'),

  password: z
    .string()
    .min(1, 'Password must have at least 1 character'),

  cep: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, 'Invalid ZIP code'),

  endereco: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
})

export type ClientRegisterFormData = z.infer<
  typeof clientRegisterSchema
>
