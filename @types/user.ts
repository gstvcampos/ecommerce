import { editUserSchema, userSchema } from '@/schemas/user'
import { z } from 'zod'

export type User = z.infer<typeof userSchema>
export type EditUser = z.infer<typeof editUserSchema>
