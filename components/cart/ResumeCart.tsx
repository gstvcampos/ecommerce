'use client'

import { Address } from '@/@types/address'
import { melhorEnvioData } from '@/@types/melhorEnvio'
import { getFreightValue } from '@/actions/marketing/getFreightValue'
import { formatPrice } from '@/lib/ultis'
import { useState } from 'react'
import { CepInput } from '../CepInput'
import OptionsFreight from '../OptionsFreight'

export default function ResumeCart({ subTotal }: { subTotal: number }) {
  const [freightOptions, setFreightOptions] = useState<null | melhorEnvioData>(
    null,
  )

  async function getAddress(address: Address) {
    const freightData = await getFreightValue(address.cep)
    setFreightOptions(freightData)
  }

  return (
    <>
      <p className="self-center font-bold">Resumo da compra</p>
      <div className="flex justify-between items-center">
        <p>Produtos</p>
        <p>{formatPrice(subTotal)}</p>
      </div>

      <CepInput getAddress={getAddress} />

      <OptionsFreight freightOptions={freightOptions} />
    </>
  )
}
