'use client'

import { newVerification } from '@/actions/newVerification'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function Verificacao() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Token é necessário')
      return
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Alguma coisa deu errado')
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div>
      {!success && !error && (
        <span className="loading loading-dots loading-lg"></span>
      )}
      <FormError message={error} />
      <FormSuccess message={success} />
    </div>
  )
}
