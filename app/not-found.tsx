import Header from '@/components/headers/marketing/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative min-h-dvh flex flex-col">
      <Header />
      <div className="flex flex-col items-center gap-10 pt-16">
        <Image
          alt="imagen pagina nao econtrada"
          src="404-page-not-found.svg"
          width={300}
          height={300}
        />
        <Link className="font-bold btn-lg btn" href="/">
          Voltar à página inicial
        </Link>
      </div>
    </main>
  )
}
