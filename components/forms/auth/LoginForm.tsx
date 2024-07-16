'use client'

import { Login } from '@/@types/auth'
import loginAction from '@/actions/auth/login'
import { Input } from '@/components/Input'
import { loginSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import FormError from '../FormError'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email em uso com outro provider'
      : ''

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')

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

    startTransition(() => {
      loginAction(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            reset()
            setError(data.error)
          }
        })
        .catch(() => setError('Tente novamente mais tarde'))
    })
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="text-end">
      <Input label="Email" {...register('email')} error={errors.email} />
      <Input
        label="Senha"
        type="password"
        {...register('password')}
        error={errors.password}
      />
      <FormError message={error || urlError} />
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
