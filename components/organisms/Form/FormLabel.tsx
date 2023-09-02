import { FormLabelProps as RadixFormLabelProps, Label } from "@radix-ui/react-form"

type FormLabelProps = RadixFormLabelProps & React.RefAttributes<HTMLLabelElement>

export const FormLabel: React.FC<FormLabelProps> = (props) => {
    return (
        <Label className="text-sm" {...props} />
    )
}
