import { FormProps, Root } from "@radix-ui/react-form"

type FormRootProps = FormProps & React.RefAttributes<HTMLFormElement>

export const FormRoot: React.FC<FormRootProps> = (props) => {
    return (
        <Root {...props} />
    )
}
