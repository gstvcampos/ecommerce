'use client'

import { PartialProduct } from '@/@types/product'
import { updateProduct } from '@/actions/admin/updateProduct'
import { Input } from '@/components/ui/Input'
import MultipleImgInput from '@/components/ui/MultipleImgInput'
import { DialogContext } from '@/contexts/DialogContext'
import { partialProductSchema } from '@/schemas/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { useContext, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function FormEditProduct({ product }: { product: Product }) {
  const { toggleEditProduct } = useContext(DialogContext)
  const [isPending, startTransition] = useTransition()
  const [imageFiles, setImageFiles] = useState<File[]>([])

  function getFiles(files: File[]) {
    setImageFiles(files)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartialProduct>({
    resolver: zodResolver(partialProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      department: product.department,
      category: product.category,
      price: product.price.toString(),
    },
  })

  async function handleEditProduct(values: PartialProduct) {
    const formData = new FormData()

    for (const key in values) {
      const value = values[key as keyof PartialProduct]
      if (value !== undefined) {
        formData.append(key, value)
      }
    }

    imageFiles.forEach((file) => {
      formData.append(`imageFiles`, file)
    })

    startTransition(() => {
      updateProduct(product.id, formData).then((data) => {
        if (data?.error) {
          reset()
          toast.error(data.error)
          toggleEditProduct()
        }

        if (data?.success) {
          reset()
          toast.success(data.success)
          toggleEditProduct()
        }
      })
    })
  }

  return (
    <form onSubmit={handleSubmit(handleEditProduct)}>
      <Input
        label="Nome do produto"
        {...register('name')}
        error={errors.name}
      />
      <Input
        label="Descrição"
        {...register('description')}
        error={errors.description}
      />
      <Input
        label="Valor do produto"
        {...register('price')}
        error={errors.price}
      />

      <MultipleImgInput getFiles={getFiles} />

      <select
        className="select select-bordered w-full mt-3"
        {...register('department')}
      >
        <option value="">Escolha o departamento do produto</option>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="infantil">Infantil</option>
        <option value="acessorio">Acessório</option>
      </select>
      {errors.department && (
        <span className="text-red-500">{errors.department.message}</span>
      )}

      <select
        className="select select-bordered w-full mt-3"
        {...register('category')}
      >
        <option value="">Escolha a categoria do produto</option>
        <option value="bermuda">Bermuda</option>
        <option value="camisa">Camisa</option>
        <option value="bolsa">Bolsa</option>
        {errors.category && (
          <span className="text-red-500">{errors.category.message}</span>
        )}
      </select>

      <button className="btn btn-block mt-3" type="submit" disabled={isPending}>
        Editar Produto
      </button>
    </form>
  )
}
