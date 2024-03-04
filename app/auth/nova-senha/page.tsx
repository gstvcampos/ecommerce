import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RegisterNewPasswordForm from '@/components/forms/auth/RegisterNewPasswordForm'

export default function NovaSenha() {
  return (
    <MaxWidthWrapper>
      <section className="my-4 w-full max-w-sm mx-auto text-center py-8">
        <div className="py-4">
          <h3 className="font-bold">CADASTRE A NOVA SENHA</h3>
          <RegisterNewPasswordForm />
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
