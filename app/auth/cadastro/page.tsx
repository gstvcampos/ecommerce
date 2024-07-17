import RegisterForm from '@/components/forms/auth/RegisterForm'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'

export default function Cadastro() {
  return (
    <MaxWidthWrapper>
      <section className="my-4 w-full max-w-sm mx-auto text-center py-8">
        <div className="py-4">
          <h3 className="font-bold">CADASTRE-SE </h3>
          <RegisterForm />
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
