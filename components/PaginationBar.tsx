import { cn } from '@/lib/ultis'
import Link from 'next/link'

type PaginationBarProps = {
  totalPages: number
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function PaginationBar({
  totalPages,
  searchParams,
}: PaginationBarProps) {
  const currentPage = Number(searchParams?.page) || 1
  const maxPage = Math.min(totalPages, Math.max(currentPage + 2, 10))
  const minPage = Math.max(1, Math.min(currentPage - 5, totalPages - 9))
  console.log('currentPage', currentPage)
  console.log('totalPages', totalPages)

  const numberedPageItems: JSX.Element[] = []

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        key={page}
        href={`?${new URLSearchParams({ ...searchParams, page: page.toString() })}`}
        className={cn(
          'join-item btn',
          currentPage === page && 'btn-active pointer-events-none',
        )}
      >
        {page}
      </Link>,
    )
  }

  return <div className="join">{numberedPageItems}</div>
}
