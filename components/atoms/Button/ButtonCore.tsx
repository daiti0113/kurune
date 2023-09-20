import { classNames } from "@/libs/styles"
import { ButtonHTMLAttributes } from "react"

export type ButtonCoreProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean
}

export const ButtonCore: React.FC<ButtonCoreProps> = ({ className, disabled, isLoading, ...props }) => {
    return (
        <button className={classNames("p-2 text-center", className)} disabled={disabled || isLoading} {...props} />
    )
}
