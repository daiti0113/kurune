import { DetailedHTMLProps, forwardRef, LabelHTMLAttributes } from "react"

type LabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function LabelInner(props, ref) {
    return (
        <label className="text-sm" {...props} ref={ref} />
    )
})
