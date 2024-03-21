'use client'

import { Address } from '@prisma/client'
import { useState } from 'react'
import AddressBox from './addressBox'
import FormCreateAddress from './forms/marketing/FormCreateAddress'

export default function SectionAddressPayment({
  userAddresses,
}: {
  userAddresses: Address[]
}) {
  const [newAddress, setNewAddress] = useState(false)
  return (
    <section>
      <h3>Entrega</h3>
      {newAddress ? (
        <FormCreateAddress />
      ) : (
        <>
          <div className="flex gap-4 p-4 flex-wrap">
            {userAddresses.map((address) => (
              <AddressBox key={address.id} address={address} />
            ))}
          </div>
          <button
            className="btn btn-outline"
            onClick={() => setNewAddress(true)}
          >
            Adicionar endereço
          </button>
        </>
      )}
    </section>
  )
}
