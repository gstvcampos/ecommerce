'use server'

import { NewPassword } from '@/@types/auth'
import { getPasswordResetTokenByToken } from '@/db/passwordResetToken'
import { prisma } from '@/db/prisma'
import { getUserByEmail } from '@/db/user'
import { newPasswordSchema } from '@/schemas/auth'
import bcrypt from 'bcryptjs'

export const newPasswordAction = async (
  values: NewPassword,
  token?: string | null,
) => {
  if (!token) return { error: 'Token nao existe!' }

  const validatedField = newPasswordSchema.safeParse(values)
  if (!validatedField.success) return { error: 'Campo invalido' }

  const existingToken = await getPasswordResetTokenByToken(token)
  if (!existingToken) return { error: 'Token invalido!' }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) return { error: 'Token expirado!' }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) return { error: 'Email nao existe' }

  const { password } = validatedField.data
  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Senha atualizada!' }
}
