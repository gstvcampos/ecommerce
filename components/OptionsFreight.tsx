import { melhorEnvioData } from '@/@types/melhorEnvio'
import { formatPrice } from '@/lib/ultis'

type OptionsFreightProps = {
  freightOptions: melhorEnvioData | null
}

export default function OptionsFreight({
  freightOptions,
}: OptionsFreightProps) {
  return (
    <div className="space-y-4">
      {freightOptions?.map((freightOption) => {
        return (
          freightOption.price && (
            <div
              key={freightOption.id}
              className="flex items-center gap-2 border px-2 py-1 bg-base-200"
            >
              <span>{formatPrice(Number(freightOption.price))}</span>
              <span className="uppercase">{freightOption.name}</span>
            </div>
          )
        )
      })}
    </div>
  )
}
