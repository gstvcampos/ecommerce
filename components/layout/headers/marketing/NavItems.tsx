import Link from 'next/link'

export default function NavItems() {
  return (
    <ul className="flex md:gap-6 flex-col md:flex-row font-bold">
      <li>
        <Link href="/produtos/masculino">MASCULINO</Link>
      </li>
      <li>
        <Link href="/produtos/feminino">FEMININO</Link>
      </li>
      <li>
        <Link href="/produtos/infantil">INFANTIL</Link>
      </li>
      <li>
        <Link href="/produtos/acessorios">ACESSÓRIOS</Link>
      </li>
      <li>
        <Link href="/produtos/outlet">OUTLET</Link>
      </li>
    </ul>
  )
}
