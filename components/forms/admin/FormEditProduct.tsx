'use client'

import { PartialProduct } from '@/@types/product'
import FormError from '@/components/forms/FormError'
import FormSuccess from '@/components/forms/FormSuccess'
import { Input } from '@/components/ui/Input'
import MultipleImgInput from '@/components/ui/MultipleImgInput'
import { partialProductSchema } from '@/schemas/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export default function FormEditProduct({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
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
    setError('')
    setSuccess('')

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
      updateProduct(formData)
        .then((data) => {
          if (data?.error) {
            reset()
            setError(data.error)
          }

          if (data?.success) {
            reset()
            setSuccess(data.success)
          }
        })
        .catch(() => setError('Tente novamente mais tarde'))
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
      <FormError message={error} />
      <FormSuccess message={success} />
      <button className="btn btn-block mt-3" type="submit" disabled={isPending}>
        Editar Produto
      </button>
    </form>
  )
}
