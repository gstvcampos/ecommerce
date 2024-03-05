'use client'

import { Address } from '@/@types/address'
import { melhorEnvioData } from '@/@types/melhorEnvio'
import { getFreightValue } from '@/actions/getFreightValue'
import { formatPrice } from '@/lib/ultis'
import { useState } from 'react'
import { CepInput } from '../CepInput'
import OptionsFreightSelect from '../OptionsFreightSelect'

export default function ResumeCart({ subTotal }: { subTotal: number }) {
  const [selectedFreight, setSelectedFreight] = useState(0)
  const [freightOptions, setFreightOptions] = useState<null | melhorEnvioData>(
    null,
  )

  async function getAddress(address: Address) {
    const freightData = await getFreightValue(address.cep)
    setFreightOptions(freightData)
  }

  function getFreightSelect(price: number | null) {
    setSelectedFreight(price || 0)
  }

  return (
    <>
      <p className="self-center font-bold">Resumo da compra</p>
      <div className="flex justify-between items-center">
        <p>Produtos</p>
        <p>{formatPrice(subTotal)}</p>
      </div>

      <CepInput getAddress={getAddress} />

      <OptionsFreightSelect
        freightOptions={freightOptions}
        getFreightSelect={getFreightSelect}
      />

      <div className="flex justify-between items-center">
        <p>Total</p>
        <p> {formatPrice(subTotal + selectedFreight)}</p>
      </div>
    </>
  )
}
