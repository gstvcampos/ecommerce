'use server'

import { prisma } from '@/db/prisma'
import { getUserByEmail } from '@/db/user'
import { getVerificationTokenByToken } from '@/db/verificationToken'

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token)
  if (!existingToken) return { error: 'Token não existe!' }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) return { error: 'Token expirado!' }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) return { error: 'Email nao existe' }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  })

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Email verificado' }
}
