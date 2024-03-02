import { createProductSchema } from '@/schemas/product'
import { z } from 'zod'

export type CreateProduct = z.infer<typeof createProductSchema>
