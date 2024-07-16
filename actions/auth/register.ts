'use server'

import { Register } from '@/@types/auth'
import { prisma } from '@/db/prisma'
import { getUserByEmail } from '@/db/user'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { registerSchema } from '@/schemas/auth'
import bcrypt from 'bcryptjs'

export default async function registerAction(values: Register) {
  const validatedFields = registerSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Esse mail já possiu uma conta' }
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: 'Confirmação de email enviada!' }
}
