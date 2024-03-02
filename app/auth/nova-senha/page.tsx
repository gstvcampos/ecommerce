'use client'

import { NewPassword } from '@/@types/auth'
import { newPasswordAction } from '@/actions/newPassword'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'
import { Input } from '@/components/Input'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { newPasswordSchema } from '@/schemas/auth'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export default function NovaSenha() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPassword>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const handleNewPassword = async (values: NewPassword) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      newPasswordAction(values, token).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <MaxWidthWrapper>
      <section className="my-4 w-full max-w-sm mx-auto text-center py-8">
        <div className="py-4">
          <h3 className="font-bold">CADASTRE-SE </h3>
          <form onSubmit={handleSubmit(handleNewPassword)}>
            <Input
              label="Nova senha"
              {...register('password')}
              error={errors.password}
            />
            <Input
              label="Cofirmar senha"
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
              Salvar nova senha
            </button>
          </form>
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
