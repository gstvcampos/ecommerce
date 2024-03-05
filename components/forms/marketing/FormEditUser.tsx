'use client'

import { EditUser, User } from '@/@types/user'
import editUserInfoAction from '@/actions/editUserInfoAction'
import { Input } from '@/components/Input'
import { editUserSchema } from '@/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'

export default function FormEditUser({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      cpf: user.cpf,
    },
  })

  const handleEditUser = async (values: EditUser) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      editUserInfoAction(values, user.id).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <form onSubmit={handleSubmit(handleEditUser)}>
      <Input label="Nome completo" {...register('name')} error={errors.name} />
      <Input
        label="Email"
        {...register('email')}
        error={errors.email}
        disabled
      />
      <Input
        label="Telefone celular"
        {...register('phoneNumber')}
        error={errors.phoneNumber}
      />
      <Input label="CPF" {...register('cpf')} error={errors.cpf} />
      <FormError message={error} />
      <FormSuccess message={success} />
      <button className="btn w-full my-4" disabled={isPending}>
        SALVAR ALTERAÇÕES
      </button>
    </form>
  )
}
