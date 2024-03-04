'use client'

import { CreateAddress } from '@/@types/address'
import { createAddressAction } from '@/actions/createAddress'
import { Input } from '@/components/Input'
import { createAddressSchema } from '@/schemas/address'
import { zodResolver } from '@hookform/resolvers/zod'
import cep from 'cep-promise'
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

  async function checkCEP(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedCep = e.target.value.replace(/\D/g, '')
    try {
      const result = await cep(formattedCep)
      setValue('cep', formattedCep)
      setValue('street', result.street)
      setValue('city', result.city)
      setValue('neighborhood', result.neighborhood)
      setValue('city', result.city)
      setValue('state', result.state)
      setError('')
      setFocus('number')
    } catch (error) {
      setError('cep inválido')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateAddress)}>
      <Input label="CEP" {...register('cep')} onBlur={checkCEP} />
      {error && <span className="text-red-500 text-sm mt-1 h-0">{error}</span>}
      <Input label="Logradouro" {...register('street')} error={errors.street} />
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
      <button type="submit" disabled={isPending} className="btn w-full">
        ADICIONAR ENDEREÇO
        {isPending && <span className="loading loading-spinner loading-md" />}
      </button>
    </form>
  )
}
