import { FormSubmitProps as RadixFormSubmitProps, Submit } from "@radix-ui/react-form"

type FormSubmitProps = RadixFormSubmitProps & React.RefAttributes<HTMLButtonElement>

export const FormSubmit: React.FC<FormSubmitProps> = (props) => {
    return (
        <Submit {...props} />
    )
}
