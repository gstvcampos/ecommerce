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
  name: z.string().min(3, 'minimo 3 caracteres').or(z.literal('')),
  email: z.string().email('Formato de email invalido').or(z.literal('')),
  phoneNumber: z.string().min(8, 'minimo 8 caracteres').or(z.literal('')),
  cpf: z.string().length(11, 'CPF invalido').or(z.literal('')),
})
