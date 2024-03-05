import { auth } from '@/auth'
import { cn } from '@/lib/ultis'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Montserrat } from 'next/font/google'
import './globals.css'

const mont = Montserrat({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Vasco Store',
  description: 'Loja oficial do vasco da gama',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="pt-br" className="!scroll-smooth">
        <body className={cn(mont.className, 'font-sans antialiased')}>
          <main className="relative flex flex-col min-h-dvh overflow-hidden">
            {children}
          </main>
        </body>
      </html>
    </SessionProvider>
  )
}
