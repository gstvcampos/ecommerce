import AdminHeader from '@/components/layout/headers/adminHeader/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminHeader />
      <div className="flex-grow flex-1">{children}</div>
    </>
  )
}
