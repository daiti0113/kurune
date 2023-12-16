import Compressor from "compressorjs"

export const compressImage = async (file: File) => {
    return new Promise<Blob>((resolve, reject) => {
        new Compressor(file, {
            quality: 0.4,
            success: resolve,
            error: reject,
        })
    })
}
