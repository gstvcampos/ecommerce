'use server'

import { EditUser } from '@/@types/user'
import { prisma } from '@/db/prisma'
import { editUserSchema } from '@/schemas/user'
import { revalidatePath } from 'next/cache'

export default async function editUserInfoAction(
  values: EditUser,
  userId: string,
) {
  const validatedFields = editUserSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, phoneNumber, cpf } = validatedFields.data

  await prisma.user.update({
    where: { id: userId },
    data: { name, phoneNumber, cpf },
  })

  revalidatePath('/')

  return { success: 'Informações alteradas com sucesso' }
}
