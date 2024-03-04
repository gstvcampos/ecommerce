import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NewPasswordForm from '@/components/forms/auth/NewPasswordForm'

export default function NovaSenha() {
  return (
    <MaxWidthWrapper>
      <section className="my-4 w-full max-w-sm mx-auto text-center py-8">
        <div className="py-4">
          <h3 className="font-bold">CADASTRE A NOVA SENHA</h3>
          <NewPasswordForm />
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
