import Link from 'next/link'

export default function DropdownSearchSort() {
  const sortVariants = ['ASC', 'DESC', 'PROMO', 'POPULAR']

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
            <Link href={`?${new URLSearchParams({ sort })}`}>{sort}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
