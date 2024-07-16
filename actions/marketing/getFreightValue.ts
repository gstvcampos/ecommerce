'use server'

export async function getFreightValue(freight: string) {
  const token = process.env.TOKEN_MELHOR_ENV

  const res = await fetch(
    'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: { postal_code: '96020360' },
        to: { postal_code: freight },
        products: [
          {
            id: 'x',
            width: 11,
            height: 17,
            length: 11,
            weight: 0.3,
            insurance_value: 10.1,
            quantity: 1,
          },
          {
            id: 'y',
            width: 16,
            height: 25,
            length: 11,
            weight: 0.3,
            insurance_value: 55.05,
            quantity: 2,
          },
          {
            id: 'z',
            width: 22,
            height: 30,
            length: 11,
            weight: 1,
            insurance_value: 30,
            quantity: 1,
          },
        ],
      }),
    },
  )
  const data = await res.json()
  return data
}
