import { classNames } from "@/libs/styles"
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react"

type MessageProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
    variant?: "error" | "info"
}

const colors: {[key in Required<MessageProps>["variant"]]: string} = {
    error : "text-warn-500",
    info: "text-neutral-500"
}

export const Message = forwardRef<HTMLSpanElement, MessageProps>(function FormFieldInner({ variant="error", ...props }, ref) {
    return (
        <span className={classNames("mt-1 text-sm", colors[variant])} {...props} ref={ref} />
    )
})
