import { auth } from '@/auth'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SectionAddressPayment from '@/components/SectionAddressPayment'
import FormUserPayment from '@/components/forms/marketing/FormUserPayment'
import { prisma } from '@/db/prisma'
import { getUserById } from '@/db/user'

export default async function PagamentoPage() {
  const session = await auth()
  const user = await getUserById(session!.user!.id!)
  const userAddresses = await prisma.address.findMany({
    where: { userId: session?.user.id },
  })

  return (
    <MaxWidthWrapper className="py-8">
      <section>
        <h3 className="">Informações</h3>
        <FormUserPayment user={user} />
      </section>
      <SectionAddressPayment userAddresses={userAddresses} />
      <section>
        <h3>Pagamento</h3>
        <div className="form-payment">
          <label className="label cursor-pointer">
            <span className="label-text">PIX</span>
            <input type="radio" name="pix" className="radio" />
          </label>
        </div>
        <div className="form-payment">
          <label className="label cursor-pointer">
            <span className="label-text">BOLETO BANCARIO</span>
            <input type="radio" name="pix" className="radio" />
          </label>
        </div>
        <div className="form-payment">
          <label className="label cursor-pointer">
            <span className="label-text">CARTÃO DE CRÉDITO</span>
            <input type="radio" name="pix" className="radio" />
          </label>
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
