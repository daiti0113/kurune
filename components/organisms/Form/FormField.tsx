import { Field, FormFieldProps as RadixFormFieldProps } from "@radix-ui/react-form"
import { forwardRef } from "react"

type FormFieldProps = RadixFormFieldProps & React.RefAttributes<HTMLDivElement> 

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormFieldInner(props, ref) {
    return (
        <Field className="flex flex-col gap-y-1" {...props} ref={ref} />
    )
})
