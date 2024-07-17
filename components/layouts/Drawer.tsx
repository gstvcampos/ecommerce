import { CloseIcon } from '../icons/CloseIcon'

export default function Drawer({
  id,
  icon,
  label,
  title,
  children,
}: {
  id: string
  label?: string
  title?: string
  icon?: JSX.Element
  children: React.ReactNode
}) {
  return (
    <div className="drawer z-20">
      <input id={id} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor={id} aria-label="open sidebar" className="btn btn-ghost">
          {icon && icon}
          {label && <span>{label}</span>}
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor={id}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <div className="flex justify-between">
            <h3 className="font-bold p-4 uppercase">{title}</h3>
            <label
              htmlFor={id}
              aria-label="close sidebar"
              className="btn btn-square btn-outline"
            >
              <CloseIcon />
            </label>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
