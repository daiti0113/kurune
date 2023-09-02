import { ButtonCoreProps } from "./ButtonCore"
import { PrimaryButton } from "./PrimaryButton"

type ButtonProps = ButtonCoreProps & {
    variant?: "primary" | "secondary" | "text"
}

export const Button: React.FC<ButtonProps> = ({ variant="primary", ...props }) => {
    switch (variant) {
        case "primary":
            return <PrimaryButton {...props} />
        case "secondary":
            return <button {...props} />
        case "text":
            return <button {...props} />
    }
}
