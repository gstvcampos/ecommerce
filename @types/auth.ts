import {
  loginSchema,
  newPasswordSchema,
  registerSchema,
  resetSchema,
} from '@/schemas/auth'
import { z } from 'zod'

export type Register = z.infer<typeof registerSchema>
export type Login = z.infer<typeof loginSchema>
export type Reset = z.infer<typeof resetSchema>
export type NewPassword = z.infer<typeof newPasswordSchema>
