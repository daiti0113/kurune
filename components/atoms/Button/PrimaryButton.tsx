import { classNames } from "@/libs/styles"
import { Loading } from "../Loading"
import { ButtonCore, ButtonCoreProps } from "./ButtonCore"

type PrimaryButtonProps = ButtonCoreProps

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className, isLoading, ...props }) => {
    return (
        <ButtonCore
            className={classNames("inline-block bg-primary-500 hover:bg-primary-700 active:bg-black-700 focus-visible:ring ring-black-300 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-8 py-2", className, isLoading && "bg-neutral-300 cursor-default")}
            isLoading={isLoading}
            {...props}
        >
            {isLoading ? <div className="flex justify-center"><Loading className="h-8 w-8 fill-primary-500" /></div> : children}
        </ButtonCore>
    )
}
