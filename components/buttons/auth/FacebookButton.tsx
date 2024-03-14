'use client'

import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { signIn } from 'next-auth/react'

export default function FacebookButton() {
  return (
    <button
      className="inline-flex items-center h-12 justify-center outline-1 outline gap-2"
      type="submit"
      onClick={() => signIn('github')}
    >
      <GitHubIcon />
      <span className="text-xs">Entrar com Github</span>
    </button>
  )
}
