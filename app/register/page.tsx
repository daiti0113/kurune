"use client"

import { Button } from "@/components/atoms/Button";
import { FormRoot } from "@/components/organisms/Form/FormRoot";
import { TextInput } from "@/components/atoms/TextInput";
import { FormControl, FormField, FormLabel, FormMessage, FormSubmit } from "@radix-ui/react-form";
import Form from "@/components/organisms/Form";

export default function Register() {
    return (
        <div>
            <h1>Register</h1>
            <Button>これはプライマリーボタンです</Button>
            <Button variant="secondary">これはセカンダリーボタンです</Button>
            <Form>
                <Form.Field name="email">
                    <Form.Label>メールアドレス</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        メールアドレスを入力してください
                    </Form.Message>
                    <Form.Message match="typeMismatch">メールアドレスの形式が誤っています</Form.Message>
                    <Form.Control asChild>
                        <TextInput type="email" required />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <Button>出品する</Button>
                </Form.Submit>
            </Form>
        </div>
    )
}
