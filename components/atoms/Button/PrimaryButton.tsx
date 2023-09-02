import { classNames } from "@/libs/styles"
import { ButtonCore, ButtonCoreProps } from "./ButtonCore"

type PrimaryButtonProps = ButtonCoreProps

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ className, ...props }) => {
    return (
        <ButtonCore className={classNames("bg-primary", className)} {...props} />
    )
}
