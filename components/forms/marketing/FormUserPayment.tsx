'use client'

import { EditUser, User } from '@/@types/user'
import editUserInfoAction from '@/actions/marketing/editUserInfoAction'
import { Input } from '@/components/Input'
import { editUserSchema } from '@/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'

export default function FormUserPayment({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [edit, setEdit] = useState(false)

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
    setEdit(false)

    startTransition(() => {
      editUserInfoAction(values, user.id).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return !user.name || !user.email || !user.phoneNumber || !user.cpf || edit ? (
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
  ) : (
    <div className="py-8">
      <p>
        {user.name} {user.cpf}
      </p>
      <p>{user.email}</p>
      <p>{user.phoneNumber}</p>
      <button className="btn" onClick={() => setEdit(true)}>
        Editar
      </button>
    </div>
  )
}
