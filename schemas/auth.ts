import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Email invalido',
  }),
  password: z.string().min(1, {
    message: 'Password é obrigatorio',
  }),
})

export const registerSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Nome é obrigatorio',
    }),
    email: z.string().email({
      message: 'Email é obrigatorio',
    }),
    password: z
      .string()
      .min(8, 'A senha precisa conter pelo menos 8 caracteres'),
    confirm: z.string().min(1, 'Confirmar senha é obrigatorio'),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'As senhas devem ser iguais',
    path: ['confirm'],
  })

export const resetSchema = z.object({
  email: z.string().email({
    message: 'Email é obrigatorio',
  }),
})

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'A senha precisa conter pelo menos 8 caracteres')
      .regex(/(?=.*?[A-Z])/, 'É necessario pelo menos uma letra maiúscula')
      .regex(/(?=.*?[a-z])/, 'É necessário pelo menos uma letra minúsculo')
      .regex(/(?=.*?[0-9])/, 'É necessário pelo menos um número')
      .regex(
        /(?=.*?[#?!@$%^&*-])/,
        'É necessário ao menos um caractere especial',
      ),
    confirm: z.string().min(1, 'Confirmar senha é obrigatorio'),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'As senhas devem ser iguais',
    path: ['confirm'],
  })
