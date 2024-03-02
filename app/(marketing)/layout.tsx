import Footer from '@/components/layout/footers/Footer'
import Header from '@/components/layout/headers/marketingHeader/Header'

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
