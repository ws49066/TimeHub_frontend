import { z } from 'zod'

export const clientRegisterSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  sobrenome: z.string().min(1, 'Sobrenome é obrigatório'),

  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),

  password: z
    .string()
    .min(1, 'Senha deve ter no mínimo 1 caracteres'),

  cep: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),

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
