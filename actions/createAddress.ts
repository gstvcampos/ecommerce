'use server'

import { CreateAddress } from '@/@types/address'
import { prisma } from '@/db/prisma'
import { createAddressSchema } from '@/schemas/address'
import { revalidatePath } from 'next/cache'

export async function createAddressAction(
  values: CreateAddress,
  userId: string,
) {
  const validatedFields = createAddressSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { cep, street, city, neighborhood, number, state } =
    validatedFields.data

  const intNumber = Number(number)

  await prisma.address.create({
    data: {
      cep,
      street,
      city,
      neighborhood,
      number: intNumber,
      state,
      userId,
    },
  })

  revalidatePath('/')
  return { success: 'Endereço criado com sucesso' }
}
