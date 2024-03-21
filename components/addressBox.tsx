import { Address } from '@prisma/client'

export default function AddressBox({ address }: { address: Address }) {
  return (
    <div key={address.id} className="border h-44 w-56 p-4 relative">
      <div>
        <p className="font-bold">{address.city} </p>
        <p className="text-sm">{address.neighborhood}</p>
        <p className="text-sm">
          {address.street} <span>{address.number}</span>
        </p>
      </div>
    </div>
  )
}
