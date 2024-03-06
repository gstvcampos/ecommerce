import Footer from '@/components/Footer'
import Header from '@/components/headers/marketing/Header'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex-grow flex-1">{children}</div>
      <Footer />
    </>
  )
}
