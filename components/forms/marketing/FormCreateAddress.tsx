'use client'

import { Address, CreateAddress } from '@/@types/address'
import { createAddressAction } from '@/actions/createAddress'
import { CepInput } from '@/components/CepInput'
import { Input } from '@/components/Input'
import { createAddressSchema } from '@/schemas/address'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'

export default function FormCreateAddress() {
  const session = useSession()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [address, setAddress] = useState<Address | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<CreateAddress>({
    resolver: zodResolver(createAddressSchema),
  })

  async function handleCreateAddress(values: CreateAddress) {
    setError('')
    setSuccess('')

    startTransition(() => {
      createAddressAction(values, session.data?.user.id).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  async function getAddress(address: Address) {
    setAddress(address)
  }

  return (
    <>
      <CepInput getAddress={getAddress} />
      {address && (
        <form>
          <div className="text-sm">
            <p>{address?.street}</p>
            <p>
              <span>{address?.neighborhood}</span>
              <span> - {address?.city}</span>
              <span> - {address?.state}</span>
            </p>
          </div>
          <Input label="Número" />
          <FormError message={error} />
          <FormSuccess message={success} />
          <button
            type="submit"
            disabled={isPending}
            className="btn w-full my-4"
          >
            ADICIONAR ENDEREÇO
            {isPending && (
              <span className="loading loading-spinner loading-md" />
            )}
          </button>
        </form>
      )}

      <form onSubmit={handleSubmit(handleCreateAddress)}>
        <Input label="CEP" {...register('cep')} />
        {error && (
          <span className="text-red-500 text-sm mt-1 h-0">{error}</span>
        )}
        <Input
          label="Logradouro"
          {...register('street')}
          error={errors.street}
        />
        <Input label="Número" {...register('number')} error={errors.number} />
        <Input
          label="Bairro"
          {...register('neighborhood')}
          error={errors.neighborhood}
        />
        <Input label="Cidade" {...register('city')} error={errors.city} />
        <Input label="UF" {...register('state')} error={errors.state} />
        <FormError message={error} />
        <FormSuccess message={success} />
        <button type="submit" disabled={isPending} className="btn w-full my-4">
          ADICIONAR ENDEREÇO
          {isPending && <span className="loading loading-spinner loading-md" />}
        </button>
      </form>
    </>
  )
}
