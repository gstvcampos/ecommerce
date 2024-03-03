'use client'

import { GoogleIcon } from '@/components/icons/GoogleIcon'
import { signIn } from 'next-auth/react'

export default function GoogleButton() {
  return (
    <button
      className="inline-flex items-center h-12 justify-center outline-1 outline gap-2"
      type="submit"
      onClick={() => signIn('google')}
    >
      <GoogleIcon />
      <span className="text-xs">Entrar com Google</span>
    </button>
  )
}
