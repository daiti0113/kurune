import { InputHTMLAttributes } from "react"

type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export const TextInput: React.FC<TextInputProps> = (props) => {
    return (
        <input {...props} />
    )
}
