'use client'

import logout from '@/actions/auth/logout'

export default function LogoutButton() {
  return (
    <button onClick={() => logout()} type="submit">
      Sair
    </button>
  )
}
