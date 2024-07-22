import { createProductSchema, partialProductSchema } from '@/schemas/product'
import { z } from 'zod'

export type CreateProduct = z.infer<typeof createProductSchema>

export type PartialProduct = z.infer<typeof partialProductSchema>
