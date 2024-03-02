import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(files: File[], folderName: string) {
  const imgsUrl = []
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    const res = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folderName,
            tags: ['nextjs-server-actions-upload-sneakers'],
          },
          function (error, result) {
            if (error) {
              reject(error)
              return
            }
            if (result) {
              resolve(result)
            }
          },
        )
        .end(buffer)
    })
    if (res) imgsUrl.push(res.url)
  }
  return imgsUrl
}
