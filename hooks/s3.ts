import { S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import { Credentials } from "aws-sdk"
import { useCallback, useState } from "react"

export const useUpload = () => {
    const [isLoading, setIsLoading] = useState(false)

    const upload = useCallback(async (acceptedFiles: File[]) => {
        if (!process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY) return null
        setIsLoading(true)
        const file = acceptedFiles[0]
        const creds = new Credentials(
          process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
        )
    
        try {
          const Key = generateFileName(file)
          const parallelUploads3 = new Upload({
            client: new S3Client({ region: "ap-northeast-1", credentials: creds }),
            params: { Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME, Key, Body: file },
            leavePartsOnError: false,
          })
          parallelUploads3.on("httpUploadProgress", (progress) => {
            console.log(progress)
          })
    
          await parallelUploads3.done()
          setIsLoading(false)
          return createImageUrl(Key)
        } catch (e) {
          console.log(e)
          throw e
        }
      }, [])

      return { upload, isLoading }
}

const generateFileName = (file: File) => {
  const name = crypto.randomUUID()
  const extension = file.type.replace(/(.*)\//g, '')
  // .quicktime が iOS Safari で再生できなかったため .mov に変換
  const converted = extension === ".quicktime" ? ".mov" : extension
  return `${name}.${converted}`
}

const createImageUrl = (Key: string) => {
  return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/${Key}`
}