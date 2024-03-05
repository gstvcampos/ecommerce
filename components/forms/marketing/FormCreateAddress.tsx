'use client'

import { Address } from '@/@types/address'
import { createAddressAction } from '@/actions/createAddress'
import { CepInput } from '@/components/CepInput'
import { Input } from '@/components/Input'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'

const initialState = {
  error: '',
  success: '',
}

export default function FormCreateAddress() {
  const { pending } = useFormStatus()
  const [address, setAddress] = useState<Address | null>(null)
  const [state, formAction] = useFormState(createAddressAction, initialState)

  async function getAddress(address: Address) {
    setAddress(address)
  }

  return (
    <>
      <CepInput getAddress={getAddress} />
      {address && (
        <form action={formAction}>
          <div className="text-sm">
            <p>{address?.street}</p>
            <p>
              <span>{address?.neighborhood}</span>
              <span> - {address?.city}</span>
              <span> - {address?.state}</span>
            </p>
          </div>
          <input hidden name="cep" value={address?.cep} />
          <input hidden name="city" value={address?.city} />
          <input hidden name="neighborhood" value={address?.neighborhood} />
          <input hidden name="state" value={address?.state} />
          <input hidden name="street" value={address?.street} />
          <Input label="Número" name="number" />
          <FormError message={state?.error} />
          <FormSuccess message={state?.success} />
          <button type="submit" disabled={pending} className="btn w-full my-4">
            ADICIONAR ENDEREÇO
            {pending && <span className="loading loading-spinner loading-md" />}
          </button>
        </form>
      )}
    </>
  )
}
