'use client'

import { Address } from '@/@types/address'
import { melhorEnvioData } from '@/@types/melhorEnvio'
import { getFreightValue } from '@/actions/getFreightValue'
import { formatPrice } from '@/lib/ultis'
import { useState } from 'react'
import { CepInput } from '../CepInput'

export default function ResumeCart({ subTotal }: { subTotal: number }) {
  const [selectedFreightValue, setSelectedFreightValue] = useState(0)
  const [freightOptions, setFreightOptions] = useState<null | melhorEnvioData>(
    null,
  )

  async function getAddress(address: Address) {
    const freightData = await getFreightValue(address.cep)
    setFreightOptions(freightData)
  }

  const handleOptionChange = (freight: number) => {
    setSelectedFreightValue(freight)
  }

  return (
    <>
      <p className="self-center font-bold">Resumo da compra</p>
      <div className="flex justify-between items-center">
        <p>Produtos</p>
        <p>{formatPrice(subTotal)}</p>
      </div>

      <CepInput getAddress={getAddress} />

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
