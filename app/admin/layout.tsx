import { auth } from '@/auth'
import AdminHeader from '@/components/headers/admin/AdminHeader'
import Aside from '@/components/headers/admin/Aside'
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
      <div className="flex min-h-screen">
        <Aside />
        <div className="w-full">
          <AdminHeader />
          <div className="flex-grow flex-1">{children}</div>
        </div>
      </div>
    )
  }
}
