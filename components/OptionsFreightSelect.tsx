'use client'

import { melhorEnvioData } from '@/@types/melhorEnvio'
import { useState } from 'react'

type OptionsFreightSelectProps = {
  freightOptions: melhorEnvioData | null
  getFreightSelect: (price: number | null) => void
}

export default function OptionsFreightSelect({
  freightOptions,
  getFreightSelect,
}: OptionsFreightSelectProps) {
  const [selectedFreight, setSelectedFreight] = useState<number | null>(null)

  const handleOptionChange = (price: number) => {
    setSelectedFreight(price)
    getFreightSelect(price)
  }

  return (
    <form>
      {freightOptions?.map((freightOption) => {
        const price = parseFloat(freightOption.price)
        return (
          freightOption.price && (
            <div key={freightOption.id}>
              <input
                type="radio"
                id={freightOption.id.toString()}
                className="radio"
                checked={selectedFreight === price}
                onChange={() => handleOptionChange(price)}
              />
              <label htmlFor={freightOption.id.toString()}>
                {freightOption.name} - {freightOption.price}
              </label>
            </div>
          )
        )
      })}
    </form>
  )
}
