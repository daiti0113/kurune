import { classNames } from "@/libs/styles"
import { ButtonHTMLAttributes } from "react"

export type ButtonCoreProps = ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonCore: React.FC<ButtonCoreProps> = ({ className, ...props }) => {
    return (
        <button className={classNames("p-2", className)} {...props} />
    )
}
