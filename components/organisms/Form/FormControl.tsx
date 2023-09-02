import { Control, FormControlProps as RadixFormControlProps } from "@radix-ui/react-form"

type FormControlProps = RadixFormControlProps & React.RefAttributes<HTMLInputElement>

export const FormControl: React.FC<FormControlProps> = (props) => {
    return (
        <Control {...props} />
    )
}
