import { UserIcon } from '@/components/icons/UserIcon'

export default function AdminHeader() {
  return (
    <header className="navbar bg-secondary text-primary-content">
      <nav className="container mx-auto flex items-center justify-end">
        <UserIcon className="border rounded-full p-1 h-8 w-8" />
      </nav>
    </header>
  )
}
