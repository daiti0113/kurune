import { InputHTMLAttributes, forwardRef } from "react"

export type TextInputCoreProps = InputHTMLAttributes<HTMLInputElement>

export const TextInputCore = forwardRef<HTMLInputElement, TextInputCoreProps>(function TextInputInner(props, ref) {
    return (
        <input
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            {...props}
            ref={ref}
        />
    )
})
