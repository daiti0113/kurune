import { FormLabelProps as RadixFormLabelProps, Label } from "@radix-ui/react-form"
import { forwardRef } from "react"

type FormLabelProps = RadixFormLabelProps & React.RefAttributes<HTMLLabelElement>

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(function FormLabelInner(props, ref) {
    return (
        <Label className="text-sm" {...props} ref={ref} />
    )
})
