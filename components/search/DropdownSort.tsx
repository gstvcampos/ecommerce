import Link from 'next/link'

type DropdownSortProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function DropdownSort({ searchParams }: DropdownSortProps) {
  const sortVariants = ['MAIOR VALOR', 'MENOR VALOR']

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
            <Link href={`?${new URLSearchParams({ ...searchParams, sort })}`}>
              {sort}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
