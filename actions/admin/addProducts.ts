'use server'

import { uploadImage } from '@/db/cloudinary'
import { prisma } from '@/db/prisma'
import { revalidatePath } from 'next/cache'

export async function addProduct(formData: FormData) {
  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const price = Number(formData.get('price') || 0)
  const imageFiles = formData.getAll('imageFiles') as File[]
  const department = formData.get('department')?.toString()
  const category = formData.get('category')?.toString()

  if (!name || !description || !price || !department || !category) {
    return { error: 'Todos os campos são obrigatorios' }
  }

  const imageUrls = await uploadImage(imageFiles, name)

  await prisma.product.create({
    data: { name, description, imageUrls, price, department, category },
  })

  revalidatePath('/')
  return { success: 'Produto adicionado' }
}
