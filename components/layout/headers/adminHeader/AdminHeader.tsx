import Link from 'next/link'

export default function AdminHeader() {
  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin">Pagina do administrador</Link>
        </div>

        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/admin/pedidos">Pedidos</Link>
          </li>
          <li>
            <Link href="/admin/produtos">Produtos</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
