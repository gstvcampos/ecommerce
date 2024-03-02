import { z } from 'zod'

export const AddressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  cep: z.string().length(8),
  street: z.string().min(1, 'O nome da rua é obrigatório'),
  number: z.string().min(1, 'O número é obrigatório'),
  neighborhood: z.string().min(1, 'O bairro é obrigatório'),
  city: z.string().min(1, 'A cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
})

export const createAddressSchema = AddressSchema.omit({
  id: true,
  userId: true,
})

export const partialAddressSchema = createAddressSchema.partial()
