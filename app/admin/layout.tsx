import { auth } from '@/auth'
import AdminHeader from '@/components/headers/admin/AdminHeader'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (session?.user.role !== 'ADMIN') {
    redirect('/')
  } else {
    return (
      <>
        <AdminHeader />
        <div className="flex-grow flex-1">{children}</div>
      </>
    )
  }
}
