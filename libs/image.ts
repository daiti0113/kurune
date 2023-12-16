import Compressor from "compressorjs"
import heic2any from "heic2any"

export const compressImage = async (file: File) => {
    const blob = new Blob([file], { type: file.type })
    // HEICをjpgに変換する
    const converted = (file.type === 'image/heif' || file.type === 'image/heic')
        ? await heic2any({ blob }) as Blob
        : file
    return new Promise<Blob>((resolve, reject) => {
        new Compressor(converted, {
            quality: 0.4,
            success: resolve,
            error: reject,
        })
    })
}
