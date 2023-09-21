import { forwardRef, SelectHTMLAttributes } from "react"

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    children: React.ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function SelectInner({children, ...props}, ref){
    return (
        <select ref={ref} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" {...props}>
            {children}
        </select>
    )
})
