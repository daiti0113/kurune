import { classNames } from "@/libs/styles"
import { Loading } from "../Loading"
import { ButtonCore, ButtonCoreProps } from "./ButtonCore"

type PrimaryButtonProps = ButtonCoreProps

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className, isLoading, ...props }) => {
    return (
        <ButtonCore
            className={classNames("bg-primary-500", className, isLoading && "bg-neutral-300 cursor-default")}
            isLoading={isLoading}
            {...props}
        >
            {isLoading ? <Loading className="h-8 w-8 fill-primary-500" /> : children}
        </ButtonCore>
    )
}
