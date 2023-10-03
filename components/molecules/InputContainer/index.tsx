import { Label } from "@/components/atoms/Label"
import { Message } from "@/components/atoms/Message"
import { classNames } from "@/libs/styles"

export type InputContainerProps = {
    label?: string
    errorMessage?: string
    children?: React.ReactNode
    unit?: string
}

export const InputContainer: React.FC<InputContainerProps> = ({ label, errorMessage, children, unit }) => {
    return (
        <div className={classNames("max-w-[500px]", unit && "w-[60%]")}>
            <Label>{label}</Label>
            <div className="flex items-end gap-2">
                {children}
                {unit && <span>{unit}</span>}
            </div>
            {errorMessage && <Message>{errorMessage}</Message>}
        </div>
    )
}
