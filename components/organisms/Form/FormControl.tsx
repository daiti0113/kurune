import { Control, FormControlProps as RadixFormControlProps } from "@radix-ui/react-form"
import { forwardRef } from "react"

type FormControlProps = RadixFormControlProps & React.RefAttributes<HTMLInputElement>

export const FormControl = forwardRef<HTMLInputElement, FormControlProps>(function FormControlInner(props, ref) {
    return (
        <Control {...props} ref={ref} />
    )
})
