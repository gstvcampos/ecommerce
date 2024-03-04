'use client'

import { Reset } from '@/@types/auth'
import { resetAction } from '@/actions/reset'
import { Input } from '@/components/Input'
import { resetSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'

export default function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const { register, handleSubmit } = useForm<Reset>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleReset = async (values: Reset) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      resetAction(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <form onSubmit={handleSubmit(handleReset)}>
      <Input label="Email" {...register('email')} name="email" />
      <FormError message={error} />
      <FormSuccess message={success} />
      <button
        className="btn my-3 w-full rounded-none"
        type="submit"
        disabled={isPending}
      >
        Enviar email de recuperação
      </button>
    </form>
  )
}
