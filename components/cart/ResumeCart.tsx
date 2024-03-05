'use client'

import { melhorEnvioResponse } from '@/@types/melhorEnvio'
import { getFreightValue } from '@/actions/getFreightValue'
import { formatPrice } from '@/lib/ultis'
import cep from 'cep-promise'
import { useState } from 'react'

export default function ResumeCart({ subTotal }: { subTotal: number }) {
  const [cepValue, setCepValue] = useState('')
  const [error, setError] = useState('')
  const [freightOptions, setFreightOptions] = useState<
    null | melhorEnvioResponse[]
  >(null)
  const [selectedFreightValue, setSelectedFreightValue] = useState(0)

  const handleFreightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCepValue(e.target.value)
  }

  const handleOptionChange = (freight: number) => {
    setSelectedFreightValue(freight)
    cep(cepValue)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await cep(cepValue)
      const freightData = await getFreightValue(cepValue)
      console.log(freightData)
      setFreightOptions(freightData)
    } catch (error) {
      setError('cep inválido')
    }
  }

  return (
    <>
      <p className="self-center font-bold">Resumo da compra</p>
      <div className="flex justify-between items-center">
        <p>Produtos</p>
        <p>{formatPrice(subTotal)}</p>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="join relative w-full">
          <input
            type="text"
            id="floating_outlined"
            name="freight"
            className="w-full border px-3 focus:outline-none pb-2.5 pt-4 text-sm peer"
            placeholder=" "
            value={cepValue}
            onChange={handleFreightChange}
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
        {error && <span className="text-sm">{error}</span>}
      </div>

      <form>
        {freightOptions &&
          freightOptions.map(
            (freightOption) =>
              freightOption.price && (
                <div key={freightOption.id}>
                  <input
                    type="radio"
                    id={freightOption.id.toString()}
                    className="radio"
                    checked={
                      selectedFreightValue === parseFloat(freightOption.price)
                    }
                    onChange={() =>
                      handleOptionChange(parseFloat(freightOption.price))
                    }
                  />
                  <label htmlFor={freightOption.id.toString()}>
                    {freightOption.name} - {freightOption.price}
                  </label>
                </div>
              ),
          )}
      </form>

      <div className="flex justify-between items-center">
        <p>Total</p>
        <p> {formatPrice(subTotal + selectedFreightValue)}</p>
      </div>
    </>
  )
}
