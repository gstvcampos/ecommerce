export default function Dropdown({
  icon,
  label,
  items,
}: {
  label?: string
  icon?: JSX.Element
  items: string[]
}) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline m-1">
        {icon && icon}
        {label && <span>{label}</span>}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {items.map((item, idx) => (
          <li key={idx}>
            <a>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
