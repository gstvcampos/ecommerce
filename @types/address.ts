import {
  AddressSchema,
  createAddressSchema,
  partialAddressSchema,
} from '@/schemas/address'
import { z } from 'zod'

export type Address = z.infer<typeof AddressSchema>
export type CreateAddress = z.infer<typeof createAddressSchema>
export type PartialAddress = z.infer<typeof partialAddressSchema>
