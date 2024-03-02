'use server'

import { prisma } from '@/db/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteAddress(addressId: string, userId: string) {
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  })

  if (!address) {
    return { error: 'Endereço não encontrado!' }
  }

  await prisma.address.delete({
    where: {
      id: addressId,
    },
  })

  revalidatePath('/')

  return { success: 'Endereço deletado com sucesso' }
}
