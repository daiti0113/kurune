import { FormSubmitProps as RadixFormSubmitProps, Submit } from "@radix-ui/react-form"
import { forwardRef } from "react"

type FormSubmitProps = RadixFormSubmitProps & React.RefAttributes<HTMLButtonElement>

export const FormSubmit = forwardRef<HTMLButtonElement, FormSubmitProps>(function FormFieldInner(props, ref) {
    return (
        <Submit {...props} ref={ref} />
    )
})
