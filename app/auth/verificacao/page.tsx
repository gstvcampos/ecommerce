'use client'

import { newVerification } from '@/actions/newVerification'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import FormError from '@/components/forms/FormError'
import FormSuccess from '@/components/forms/FormSuccess'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function Verificacao() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError('Token é necessário')
      return
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
        if (data.success) {
          setTimeout(() => {
            router.push('/auth/login')
          }, 2000)
        }
      })
      .catch(() => {
        setError('Alguma coisa deu errado')
      })
  }, [token, success, error, router])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <MaxWidthWrapper>
      <section className="py-32 w-full max-w-sm mx-auto text-center">
        {!success && !error && (
          <span className="loading loading-dots loading-lg"></span>
        )}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </section>
    </MaxWidthWrapper>
  )
}
