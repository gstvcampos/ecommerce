'use client'

import { Login } from '@/@types/auth'
import loginAction from '@/actions/login'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'
import { Input } from '@/components/Input'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { loginSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import FacebookButton from './FacebookButton'
import GoogleButton from './GoogleButton'

export default function Login() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked' &&
    'Email em uso com outro provider'

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
    <MaxWidthWrapper>
      <section className="py-8 w-full max-w-sm mx-auto text-center">
        <h3 className="font-bold">FAZER LOGIN</h3>
        <form onSubmit={handleSubmit(handleLogin)} className="text-end">
          <Input label="Email" {...register('email')} error={errors.email} />
          <Input
            label="Senha"
            {...register('password')}
            error={errors.password}
          />
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
        <Link href={'cadastro'} className="font-bold text-sm hover:underline">
          Não tem uma conta? Cadastre-se
        </Link>
        <div className="flex items-center py-6">
          <div className="flex-grow border-b-[1px]"></div>
          <span className="px-2 font-bold text-xs">
            Ou selecione outra opção
          </span>
          <div className="flex-grow border-b-[1px]"></div>
        </div>
        <div className="flex flex-col gap-2">
          <GoogleButton />
          <FacebookButton />
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
