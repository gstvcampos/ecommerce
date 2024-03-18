'use server'

import { Login } from '@/@types/auth'
import { signIn } from '@/auth'
import { getUserByEmail } from '@/db/user'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { loginSchema } from '@/schemas/auth'
import { AuthError } from 'next-auth'

export default async function loginAction(
  values: Login,
  callbackUrl?: string | null,
) {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email ou senha invalido' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Email ou senha invalido' }
        default:
          return { error: 'Algo deu errado, tente novamente mais tarde' }
      }
    }

    throw error
  }
}
