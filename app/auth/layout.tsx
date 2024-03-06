import HeaderAuth from '@/components/headers/auth/HeaderAuth'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderAuth />
      <div className="flex-grow flex-1">{children}</div>
    </>
  )
}
