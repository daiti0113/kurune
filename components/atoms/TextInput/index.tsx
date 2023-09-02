import { InputHTMLAttributes } from "react"

type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export const TextInput: React.FC<TextInputProps> = (props) => {
    return (
        <input className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" {...props} />
    )
}
