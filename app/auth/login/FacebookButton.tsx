'use client'

import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { signIn } from 'next-auth/react'

export default function FacebookButton() {
  return (
    <button
      className="inline-flex items-center h-12 justify-center outline-1 outline gap-2"
      type="submit"
      onClick={() => signIn('github')}
    >
      <FacebookIcon />
      <span className="text-xs">Entrar com Github</span>
    </button>
  )
}
