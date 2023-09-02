import { Field, FormFieldProps as RadixFormFieldProps } from "@radix-ui/react-form"

type FormFieldProps = RadixFormFieldProps & React.RefAttributes<HTMLDivElement> 

export const FormField: React.FC<FormFieldProps> = (props) => {
    return (
        <Field {...props} />
    )
}
