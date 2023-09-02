import { FormMessageProps as RadixFormMessageProps, Message } from "@radix-ui/react-form"

type FormMessageProps = RadixFormMessageProps & React.RefAttributes<HTMLSpanElement>

export const FormMessage: React.FC<FormMessageProps> = ({...props}) => {
    return (
        <Message className="mt-1 text-sm text-warn-500" {...props} />
    )
}
