import { classNames } from "@/libs/styles"

type DividerProps = {
    className?: string
}

export const Divider: React.FC<DividerProps> = ({className}) => {
    return (
        <div className={classNames("h-[1px] w-full bg-neutral-300", className)} />
    )
}