import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.date(),
  image: z.string().nullable(),
  password: z.string(),
  cpf: z.string(),
  phoneNumber: z.string(),
  role: z.enum(['USER', 'ADMIN']),
})

export const editUserSchema = z.object({
  name: z.string().min(3, 'minimo 3 caracteres'),
  email: z.string().email('Formato de email invalido'),
  phoneNumber: z.string().min(8, 'minimo 8 caracteres'),
  cpf: z.string().length(11, 'CPF invalido'),
})
