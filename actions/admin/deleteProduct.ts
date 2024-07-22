'use server'

import { prisma } from '@/db/prisma'

export async function deleteProduct(productId: string) {
  if (!productId) {
    return { error: 'ID do produto é obrigatório' }
  }

  try {
    await prisma.product.delete({
      where: { id: productId },
    })
    return { success: 'Produto deletado' }
  } catch (error) {
    console.error(error)
    return { error: 'Erro ao deletar o produto' }
  }
}
