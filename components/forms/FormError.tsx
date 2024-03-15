import { ExclamationTriangleIcon } from '../icons/ExclamationTriangleIcon'

export default function FormError({ message }: { message?: string }) {
  if (!message) return null

  return (
    <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500 my-4">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
