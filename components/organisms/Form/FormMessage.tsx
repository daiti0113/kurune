import { FormMessageProps as RadixFormMessageProps, Message } from "@radix-ui/react-form"

type FormMessageProps = RadixFormMessageProps & React.RefAttributes<HTMLSpanElement>

export const FormMessage: React.FC<FormMessageProps> = (props) => {
    return (
        <Message {...props} />
    )
}
