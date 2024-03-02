'use client'

import { getFreightValue } from '@/actions/getFreightValue'
import { formatPrice } from '@/lib/ultis'
import cep from 'cep-promise'
import { useState } from 'react'
import Redirect from './Redirect'

export default function ResumeCart({ subTotal }: { subTotal: number }) {
  const [cepValue, setcepValue] = useState('')
  const [error, setError] = useState('')
  const [options, setOptions] = useState(null)
  const [selectedOption, setSelectedOption] = useState(0)

  const handleFreightChange = (e) => {
    setcepValue(e.target.value)
  }

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId)
    cep(cepValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await cep(cepValue)
      const freightData = await getFreightValue(cepValue)
      setOptions(freightData)
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
            className="w-full border px-3 focus:outline-none pb-2.5 pt-4 text-sm bg-black peer"
            placeholder=" "
            value={cepValue}
            onChange={handleFreightChange}
          />
          <label
            htmlFor="floating_outlined"
            className="absolute bg-black text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
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
        {options &&
          options.map(
            (option) =>
              option.price && (
                <div key={option.id}>
                  <input
                    type="radio"
                    id={option.id}
                    className="radio"
                    checked={selectedOption === parseFloat(option.price)}
                    onChange={() =>
                      handleOptionChange(parseFloat(option.price))
                    }
                  />
                  <label htmlFor={option.id}>
                    {option.name} - {option.price}
                  </label>
                </div>
              ),
          )}
      </form>

      <div className="flex justify-between items-center">
        <p>Total</p>
        <p> {formatPrice(subTotal + selectedOption)}</p>
      </div>
    </>
  )
}
