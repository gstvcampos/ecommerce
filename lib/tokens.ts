import { getPasswordResetTokenByEmail } from '@/db/passwordResetToken'
import { prisma } from '@/db/prisma'
import { getVerificationTokenByEmail } from '@/db/verificationToken'
import { v4 as uuidv4 } from 'uuid'

export async function generateVerificationToken(email: string) {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: { email, token, expires },
  })

  return verificationToken
}

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return passwordResetToken
}
