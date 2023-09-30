import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react"

type MessageProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export const Message = forwardRef<HTMLSpanElement, MessageProps>(function FormFieldInner(props, ref) {
    return (
        <span className="mt-1 text-sm text-warn-500" {...props} ref={ref} />
    )
})
