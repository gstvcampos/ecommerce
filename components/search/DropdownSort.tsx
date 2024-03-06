import Link from 'next/link'

type DropdownSortProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function DropdownSort({ searchParams }: DropdownSortProps) {
  const sortVariants = ['ASC', 'DESC', 'PROMO', 'POPULAR']
  const selectSize = (searchParams?.size || '') as string
  const selectCategory = (searchParams?.category || '') as string

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline m-1">
        Ordenar
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {sortVariants.map((sort, idx) => (
          <li key={idx}>
            <Link
              href={`?${new URLSearchParams({ sort, category: selectCategory, size: selectSize })}`}
            >
              {sort}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
