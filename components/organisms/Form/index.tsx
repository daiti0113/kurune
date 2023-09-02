import { FormControl } from "./FormControl";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { FormMessage } from "./FormMessage";
import { FormRoot, FormRootProps } from "./FormRoot";
import { FormSubmit } from "./FormSubmit";

/**
 * props に関しては、Radix UI のドキュメントを参照してください。  
 * https://www.radix-ui.com/primitives/docs/components/form
 */
const Form = (props: FormRootProps) => <FormRoot {...props} />

Form.Field = FormField
Form.Label = FormLabel
Form.Message = FormMessage
Form.Control = FormControl
Form.Submit = FormSubmit

export default Form
