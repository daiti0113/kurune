import { FormMessageProps as RadixFormMessageProps, Message } from "@radix-ui/react-form"
import { forwardRef } from "react"

type FormMessageProps = RadixFormMessageProps & React.RefAttributes<HTMLSpanElement>

export const FormMessage = forwardRef<HTMLSpanElement, FormMessageProps>(function FormFieldInner(props, ref) {
    return (
        <Message className="mt-1 text-sm text-warn-500" {...props} ref={ref} />
    )
})
