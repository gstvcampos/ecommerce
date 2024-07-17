import { auth } from '@/auth'
import { Input } from '@/components/Input'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { prisma } from '@/db/prisma'
import { getUserById } from '@/db/user'

export default async function PagamentoPage() {
  const session = await auth()
  const user = await getUserById(session!.user!.id!)
  const userAddresses = await prisma.address.findMany({
    where: { userId: session?.user.id },
  })

  return (
    <MaxWidthWrapper>
      <section className="py-8 md:py-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-primary">
                  Detalhes da entrega
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input label="Nome" />
                  <Input label="E-mail" />
                  <Input label="Telefone" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Payment</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4y-7000">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="credit-card"
                          aria-describedby="credit-card-text"
                          type="radio"
                          name="payment-method"
                          value=""
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600y-6000t-gray-800-primary-600"
                          checked
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="credit-card"
                          className="font-medium leading-none text-primary"
                        >
                          {' '}
                          Credit Card{' '}
                        </label>
                        <p
                          id="credit-card-text"
                          className="mt-1 text-xs font-normal text-gray-500400"
                        >
                          Pay with your credit card
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500 hover:text-primary400-white"
                      >
                        Delete
                      </button>

                      <div className="h-3 w-px shrink-0 bg-gray-2000"></div>

                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500 hover:text-primary400-white"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4y-7000">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="pay-on-delivery"
                          aria-describedby="pay-on-delivery-text"
                          type="radio"
                          name="payment-method"
                          value=""
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600y-6000t-gray-800-primary-600"
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="pay-on-delivery"
                          className="font-medium leading-none text-primary"
                        >
                          {' '}
                          Payment on delivery{' '}
                        </label>
                        <p
                          id="pay-on-delivery-text"
                          className="mt-1 text-xs font-normal text-gray-500400"
                        >
                          +$15 payment processing fee
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500 hover:text-primary400-white"
                      >
                        Delete
                      </button>

                      <div className="h-3 w-px shrink-0 bg-gray-2000"></div>

                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500 hover:text-primary400-white"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4y-7000">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="paypal-2"
                          aria-describedby="paypal-text"
                          type="radio"
                          name="payment-method"
                          value=""
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600y-6000t-gray-800-primary-600"
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="paypal-2"
                          className="font-medium leading-none text-primary"
                        >
                          {' '}
                          Paypal account{' '}
                        </label>
                        <p
                          id="paypal-text"
                          className="mt-1 text-xs font-normal text-gray-500400"
                        >
                          Connect to your account
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500 hover:text-primary400-white"
                      >
                        Delete
                      </button>

                      <div className="h-3 w-px shrink-0 bg-gray-2000"></div>

                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500 hover:text-primary400-white"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                  Delivery Methods
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4y-7000">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="dhl"
                          aria-describedby="dhl-text"
                          type="radio"
                          name="delivery-method"
                          value=""
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600y-6000t-gray-800-primary-600"
                          checked
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="dhl"
                          className="font-medium leading-none text-primary"
                        >
                          {' '}
                          $15 - DHL Fast Delivery{' '}
                        </label>
                        <p
                          id="dhl-text"
                          className="mt-1 text-xs font-normal text-gray-500400"
                        >
                          Get it by Tommorow
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4y-7000">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="fedex"
                          aria-describedby="fedex-text"
                          type="radio"
                          name="delivery-method"
                          value=""
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600y-6000t-gray-800-primary-600"
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="fedex"
                          className="font-medium leading-none text-primary"
                        >
                          {' '}
                          Free Delivery - FedEx{' '}
                        </label>
                        <p
                          id="fedex-text"
                          className="mt-1 text-xs font-normal text-gray-500400"
                        >
                          Get it by Friday, 13 Dec 2023
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4y-7000">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="express"
                          aria-describedby="express-text"
                          type="radio"
                          name="delivery-method"
                          value=""
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600y-6000t-gray-800-primary-600"
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="express"
                          className="font-medium leading-none text-primary"
                        >
                          {' '}
                          $49 - Express Delivery{' '}
                        </label>
                        <p
                          id="express-text"
                          className="mt-1 text-xs font-normal text-gray-500400"
                        >
                          Get it today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="voucher"
                  className="mb-2 block text-sm font-medium text-primary"
                >
                  {' '}
                  Enter a gift card, voucher or promotional code{' '}
                </label>
                <div className="flex max-w-md items-center gap-4">
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-primary focus:border-primary-500 focus:ring-primary-500y-6000r:text-gray-400er-primary-500-primary-500"
                    placeholder=""
                    required
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300-600rimary-700-primary-800"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200y-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-primary">
                      $8,094.00
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-500">0</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-primary">$99</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-primary">$199</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-primary">Total</dt>
                    <dd className="text-base font-bold text-primary">
                      $8,392.00
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300-600rimary-700-primary-800"
                >
                  Proceed to Payment
                </button>

                <p className="text-sm font-normal text-gray-500400">
                  One or more items in your cart require an account.{' '}
                  <a
                    href="#"
                    title=""
                    className="font-medium text-primary-700 underline hover:no-underlinery-500"
                  >
                    Sign in or create an account now.
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </MaxWidthWrapper>
  )
}
