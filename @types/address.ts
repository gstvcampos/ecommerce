import { createAddressSchema, partialAddressSchema } from '@/schemas/address'
import { z } from 'zod'

export type Address = {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
}

export type CreateAddress = z.infer<typeof createAddressSchema>
export type PartialAddress = z.infer<typeof partialAddressSchema>
