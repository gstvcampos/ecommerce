'use client'

import { Reset } from '@/@types/auth'
import { resetAction } from '@/actions/reset'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'
import { Input } from '@/components/Input'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { resetSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export default function Reset() {
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
    <MaxWidthWrapper>
      <section className="my-4 w-full max-w-sm mx-auto text-center py-8">
        <div className="py-4">
          <h3 className="font-bold">Recuperar senha</h3>
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
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
