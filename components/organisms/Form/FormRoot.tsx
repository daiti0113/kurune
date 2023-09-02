import { FormProps, Root } from "@radix-ui/react-form"
import { forwardRef } from "react"

export type FormRootProps = FormProps & React.RefAttributes<HTMLFormElement>

export const FormRoot = forwardRef<HTMLFormElement, FormRootProps>(function FormFieldInner(props, ref) {
    return (
        <Root className="flex flex-col" {...props} ref={ref} />
    )
})
