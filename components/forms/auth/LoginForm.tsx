'use client'

import { Login } from '@/@types/auth'
import loginAction from '@/actions/login'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'
import { Input } from '@/components/Input'
import { loginSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email em uso com outro provider'
      : ''

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin = (values: Login) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      loginAction(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            reset()
            setError(data.error)
          }

          if (data?.success) {
            reset()
            setSuccess(data.success)
          }
        })
        .catch(() => setError('Tente novamente mais tarde'))
    })
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="text-end">
      <Input label="Email" {...register('email')} error={errors.email} />
      <Input label="Senha" {...register('password')} error={errors.password} />
      <FormError message={error || urlError} />
      <FormSuccess message={success} />
      <Link href="reset" className="text-xs hover:underline">
        esqueceu a senha?
      </Link>
      <button
        className="btn my-2 w-full rounded-none"
        type="submit"
        disabled={isPending}
      >
        ENTRAR
      </button>
    </form>
  )
}
