import { Label } from "@/components/atoms/Label"
import { Message } from "@/components/atoms/Message"

export type InputContainerProps = {
    label?: string
    errorMessage?: string
    children?: React.ReactNode
}

export const InputContainer: React.FC<InputContainerProps> = ({ label, errorMessage, children }) => {
    return (
        <div className="max-w-[500px]">
            <Label>{label}</Label>
            {children}
            {errorMessage && <Message>{errorMessage}</Message>}
        </div>
    )
}
