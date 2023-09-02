import { InputHTMLAttributes } from "react"

type ImageInputProps = InputHTMLAttributes<HTMLInputElement>

export const ImageInput: React.FC<ImageInputProps> = (props) => {
    return (
        <input type="image" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" {...props} />
    )
}
