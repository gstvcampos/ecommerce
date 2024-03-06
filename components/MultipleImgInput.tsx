'use client'

import Image from 'next/image'
import { useState } from 'react'
import { CloseIcon } from './icons/CloseIcon'
import { ImagePlaceholderIcon } from './icons/ImagePlaceholderIcon'

export default function MultipleImgInput({
  getFiles,
}: {
  getFiles: (files: File[]) => void
}) {
  const [files, setFile] = useState<File[]>([])
  const [error, setError] = useState<string | undefined>('')

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    const newFile = e.target.files

    if (newFile) {
      for (let i = 0; i < newFile.length; i++) {
        const fileType = newFile[i].type
        const validImageTypes = [
          'image/gif',
          'image/jpeg',
          'image/png',
          'image/webp',
        ]
        if (validImageTypes.includes(fileType)) {
          const newFilesArray = [...files, newFile[i]]
          setFile(newFilesArray)
          getFiles(newFilesArray)
        } else {
          setError('only images accepted')
        }
      }
    }
  }

  const removeImage = (name: string) => {
    setFile(files.filter((file) => file.name !== name))
  }

  return (
    <div className="rounded-md m-4">
      <span className="flex justify-center items-center text-xs mb-1 text-red-500">
        {error}
      </span>
      <div className="flex items-center justify-center w-full">
        <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-base-200">
          <div className="flex flex-col items-center pt-6">
            <ImagePlaceholderIcon />
            <p className="text-sm tracking-wider">Selecione suas imagens</p>
          </div>
          <input
            type="file"
            onChange={handleFile}
            className="opacity-0"
            multiple
            name="files"
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-4">
        {files.map((file, key) => {
          return (
            <div key={key} className="avatar indicator">
              <button
                onClick={() => {
                  removeImage(file.name)
                }}
                className="indicator-item badge-accent rounded-full cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
              <div className="w-20 h-20 rounded-lg relative">
                <Image alt="" fill src={URL.createObjectURL(file)} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
