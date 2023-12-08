import { TextInputCore, TextInputCoreProps } from "@/components/atoms/TextInputCore"
import { forwardRef } from "react"
import { InputContainer, InputContainerProps } from "../InputContainer"

type TextInputProps = TextInputCoreProps & InputContainerProps

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInputInner({errorMessage, label, unit, description, ...props}, ref) {
    return (
        <InputContainer label={label} errorMessage={errorMessage} unit={unit} description={description}>
            <TextInputCore {...props} ref={ref} />
        </InputContainer>
    )
})
