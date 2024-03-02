import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string().min(1, 'campo obrigatorio'),
  department: z.string().min(1, 'campo obrigatorio'),
  category: z.string().min(1, 'campo obrigatorio'),
  price: z.string().min(1, 'campo obrigatorio'),
})
