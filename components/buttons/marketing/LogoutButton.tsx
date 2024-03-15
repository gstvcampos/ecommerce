'use client'

import logout from '@/actions/logout'

export default function LogoutButton() {
  return (
    <button onClick={() => logout()} type="submit">
      Sair
    </button>
  )
}
