'use client'

import { Address } from '@/@types/address'
import cep from 'cep-promise'
import { useState } from 'react'

export function CepInput({
  getAddress,
}: {
  getAddress: (cep: Address) => void
}) {
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    try {
      const cepValue = e.currentTarget.cep.value
      const address = await cep(cepValue)
      console.log(address)
      getAddress(address)
    } catch (error) {
      setError('cep inválido')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="join relative w-full">
        <input
          type="text"
          id="floating_outlined"
          name="cep"
          className="w-full border px-3 focus:outline-none pb-2.5 pt-4 text-sm peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 bg-primary-content"
        >
          CEP
        </label>
        <button
          type="submit"
          className="border absolute top-0 end-0 h-full p-2.5"
        >
          Calcular
        </button>
      </form>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  )
}
