import FacebookButton from '@/components/buttons/auth/FacebookButton'
import GoogleButton from '@/components/buttons/auth/GoogleButton'
import LoginForm from '@/components/forms/auth/LoginForm'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'
import Link from 'next/link'

export default function Login() {
  return (
    <MaxWidthWrapper>
      <section className="py-8 w-full max-w-sm mx-auto text-center">
        <h3 className="font-bold">FAZER LOGIN</h3>
        <LoginForm />
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
