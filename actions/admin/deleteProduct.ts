'use server'

import { prisma } from '@/db/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteProduct(productId: string) {
  if (!productId) {
    return { error: 'ID do produto é obrigatório' }
  }

  try {
    await prisma.product.delete({
      where: { id: productId },
    })
    revalidatePath('/')
    return { success: 'Produto deletado' }
  } catch (error) {
    revalidatePath('/')
    return { error: 'Erro ao deletar o produto' }
  }
}
