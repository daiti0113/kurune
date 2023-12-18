import { forwardRef, InputHTMLAttributes } from "react"

type CheckboxCoreProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: React.ReactNode
}

export const CheckboxCore = forwardRef<HTMLInputElement, CheckboxCoreProps>(function CheckboxCoreInner({label, ...props}, ref) {
    return (
        <div className="flex items-center mb-4">
            <input id={props.name} type="checkbox" value="" className="w-4 h-4 accent-primary-500 text-primary-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" {...props} ref={ref} />
            <label htmlFor={props.name} className="ml-2 text-sm font-medium">{label}</label>
        </div>
    )
})
