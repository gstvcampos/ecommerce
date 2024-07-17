import ResetPasswordForm from '@/components/forms/auth/ResetPasswordForm'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'

export default function Reset() {
  return (
    <MaxWidthWrapper>
      <section className="my-4 w-full max-w-sm mx-auto text-center py-8">
        <div className="py-4">
          <h3 className="font-bold">Recuperar senha</h3>
          <ResetPasswordForm />
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
