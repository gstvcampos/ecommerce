'use server'

import { uploadImage } from '@/db/cloudinary'
import { prisma } from '@/db/prisma'
import { revalidatePath } from 'next/cache'

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const price = Number(formData.get('price') || 0)
  const imageFiles = formData.getAll('imageFiles') as File[]
  const department = formData.get('department')?.toString()
  const category = formData.get('category')?.toString()

  if (!id) {
    return { error: 'ID do produto é obrigatório' }
  }

  const imageUrls = await uploadImage(imageFiles, name || '')

  await prisma.product.update({
    where: { id },
    data: { name, description, imageUrls, price, department, category },
  })
  revalidatePath('/')
  return { success: 'Produto atualizado' }
}
