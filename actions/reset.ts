'use server'

import { Reset } from '@/@types/auth'
import { getUserByEmail } from '@/db/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'
import { resetSchema } from '@/schemas/auth'

export const resetAction = async (values: Reset) => {
  const validatedFields = resetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Email invalido!' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email não encontrado!' }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  )

  return { success: 'Email de recuperação enviado!' }
}
