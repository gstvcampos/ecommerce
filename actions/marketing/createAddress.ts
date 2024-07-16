'use server'

import { State } from '@/@types/state'
import { auth } from '@/auth'
import { prisma } from '@/db/prisma'
import { AddressSchema } from '@/schemas/address'
import { revalidatePath } from 'next/cache'

export async function createAddressAction(
  prevState: State,
  formData: FormData,
) {
  const session = await auth()
  const userId = session?.user.id

  if (!session) {
    return { error: 'Usuario não autenticado' }
  }

  const formDataObj = Object.fromEntries(formData.entries())
  const validatedFields = AddressSchema.safeParse(formDataObj)

  if (!validatedFields.success) {
    return { error: 'Campos invalidos!' }
  }

  const { data } = validatedFields

  await prisma.address.create({
    data: {
      ...data,
      userId,
    },
  })

  revalidatePath('/')
  return { success: 'Endereço criado com sucesso' }
}
