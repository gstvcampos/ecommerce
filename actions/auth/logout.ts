'use server'

import { signOut } from '@/auth'
import { revalidatePath } from 'next/cache'

export default async function logout() {
  await signOut()
  revalidatePath('/')
}
