import Link from 'next/link'
import { CloseIcon } from '../icons/CloseIcon'

type DrawerFilterProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function DrawerFilter({ searchParams }: DrawerFilterProps) {
  const sizeVariants = ['P', 'M', 'G', 'GG']
  const categoryVariants = ['camisa', 'bermuda']

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn">
          Filtrar
        </label>
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200">
          <div className="flex justify-between items-center py-4">
            <h3>FILTRAR POR</h3>
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="cursor-pointer"
            >
              <CloseIcon />
            </label>
          </div>
          <div>
            <details open>
              <summary>Tamanho</summary>
              <ul>
                {sizeVariants.map((size, idx) => (
                  <li key={idx}>
                    <Link
                      href={`?${new URLSearchParams({ ...searchParams, page: '1', size })}`}
                    >
                      {size}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>
          <div>
            <details open>
              <summary>Estilo</summary>
              <ul>
                {categoryVariants.map((category, idx) => (
                  <li key={idx}>
                    <Link
                      href={`?${new URLSearchParams({ ...searchParams, page: '1', category })}`}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
