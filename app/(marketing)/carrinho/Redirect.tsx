import Link from 'next/link'

export default async function Redirect() {
  return (
    <>
      <Link href={'/pagamento'} className="btn btn-primary w-full">
        IR PARA PAGAMENTO
      </Link>
      <Link href={'/'} className="btn btn-primary w-full">
        CONTINUAR COMPRANDO
      </Link>
    </>
  )
}
