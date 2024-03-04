export default function DropdownSearchSort() {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline m-1">
        Ordenar
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Preço crescente</a>
        </li>
        <li>
          <a>Preço decrescente</a>
        </li>
        <li>
          <a>Promoções</a>
        </li>
        <li>
          <a>Mais procurados</a>
        </li>
      </ul>
    </div>
  )
}
