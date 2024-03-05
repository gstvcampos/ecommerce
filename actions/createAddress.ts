'use server'

import { auth } from '@/auth'
import { prisma } from '@/db/prisma'
import { AddressSchema } from '@/schemas/address'
import { revalidatePath } from 'next/cache'

export async function createAddressAction(prevState: any, formData: any) {
  const session = await auth()
  const userId = session?.user.id
  const formDataObj = Object.fromEntries(formData.entries())

  if (!session) {
    return { error: 'Usuario não autenticado' }
  }

  const validatedFields = AddressSchema.safeParse(formDataObj)
  const { data: addressData } = validatedFields

  if (!validatedFields.success) {
    return { error: 'Campos invalidos!' }
  }

  await prisma.address.create({
    data: {
      ...addressData,
      userId,
    },
  })

  revalidatePath('/')
  return { success: 'Endereço criado com sucesso' }
}
