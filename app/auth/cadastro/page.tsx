'use client'

import { Register } from '@/@types/auth'
import registerAction from '@/actions/register'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'
import { Input } from '@/components/Input'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { registerSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export default function Cadastro() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  const handleRegister = async (values: Register) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      registerAction(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <MaxWidthWrapper>
      <section className="my-4 w-full max-w-sm mx-auto text-center py-8">
        <div className="py-4">
          <h3 className="font-bold">CADASTRE-SE </h3>
          <form onSubmit={handleSubmit(handleRegister)}>
            <Input label="Nome" {...register('name')} error={errors.name} />
            <Input label="Email" {...register('email')} error={errors.email} />
            <Input
              label="Senha"
              {...register('password')}
              error={errors.password}
            />
            <Input
              label="cofirmar senha"
              {...register('confirm')}
              error={errors.confirm}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <button
              className="btn my-3 w-full rounded-none"
              type="submit"
              disabled={isPending}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
