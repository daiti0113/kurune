"use client"

import { Button } from "@/components/atoms/Button";
import { FormRoot } from "@/components/atoms/Organisms/Form/FormRoot";
import { FormControl, FormField, FormLabel, FormMessage, FormSubmit } from "@radix-ui/react-form";

export default function Register() {
    return (
        <div>
            <h1>Register</h1>
            <Button>これはプライマリーボタンです</Button>
            <Button variant="secondary">これはセカンダリーボタンです</Button>
            <FormRoot>
                <FormField name="email">
                    <FormLabel>メールアドレス</FormLabel>
                    <FormMessage className="FormMessage" match="valueMissing">
                        メールアドレスを入力してください
                    </FormMessage>
                    <FormMessage match="typeMismatch">メールアドレスの形式が誤っています</FormMessage>
                    <FormControl asChild>
                        <input type="email" required />
                    </FormControl>
                </FormField>
                <FormSubmit asChild>
                    <Button>出品する</Button>
                </FormSubmit>
            </FormRoot>
        </div>
    )
}
