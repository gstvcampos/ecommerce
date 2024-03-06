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
            <div key={freightOption.id} className="flex items-center gap-2">
              <input
                type="radio"
                id={freightOption.id.toString()}
                className="radio h-4 w-4"
                checked={selectedFreight === price}
                onChange={() => handleOptionChange(price)}
              />
              <label htmlFor={freightOption.id.toString()}>
                <span className="lowercase">{freightOption.name} - </span>
                <span>{freightOption.price}</span>
              </label>
            </div>
          )
        )
      })}
    </form>
  )
}
