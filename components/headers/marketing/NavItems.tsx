import Link from 'next/link'

export default function NavItems() {
  return (
    <ul className="flex md:gap-6 flex-col md:flex-row font-bold">
      <li>
        <Link href="/produtos/masculino">Masculino</Link>
      </li>
      <li>
        <Link href="/produtos/feminino">Feminino</Link>
      </li>
      <li>
        <Link href="/produtos/infantil">Infantil</Link>
      </li>
      <li>
        <Link href="/produtos/acessorios">Acessórios</Link>
      </li>
      <li>
        <Link href="/produtos/outlet">Outlet</Link>
      </li>
    </ul>
  )
}
