"use client"

import { Button } from "@/components/atoms/Button";
import { TextArea } from "@/components/atoms/TextArea";
import { TextInput } from "@/components/atoms/TextInput";
import { FormControl } from "@/components/organisms/Form/FormControl";
import { FormField } from "@/components/organisms/Form/FormField";
import { FormLabel } from "@/components/organisms/Form/FormLabel";
import { FormMessage } from "@/components/organisms/Form/FormMessage";
import { FormRoot } from "@/components/organisms/Form/FormRoot";
import { FormSubmit } from "@/components/organisms/Form/FormSubmit";
import { Article } from "@/libs/microcms";
import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useState } from "react";

type CommentFormProps = {
    article: Article
}

export const CommentForm: React.FC<CommentFormProps> = ({article}) => {
    const [isLoading, setIsLoading] = useState(false)
    const createCommentMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/comments/create", { method: "POST", body: JSON.stringify(data) })
            const parsed = await res.json()
        },
    })
    const sendEmailMutation = useMutation({
        // TODO: anyをやめて型安全にする
        mutationFn: async (comment: any) => {
            const res = await fetch("/api/notify/email", { method: "POST", body: JSON.stringify({article, comment}) })
            const parsed = await res.json()
        },
    })
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append("item", article.id)
        await createCommentMutation.mutateAsync(Object.fromEntries(formData))
        await sendEmailMutation.mutateAsync(Object.fromEntries(formData))
        setIsLoading(false)
    }

    return (
        <div>
            <h1 className="text-xl font-bold">この商品について問い合わせる</h1>
            <FormRoot onSubmit={onSubmit}>
                <div className="mt-20">
                    <div className="mt-4 flex flex-col gap-10">
                        <FormField name="name">
                            <FormLabel>名前</FormLabel>
                            <FormControl asChild>
                                <TextInput required />
                            </FormControl>
                            <FormMessage match="valueMissing">
                                名前を入力してください
                            </FormMessage>
                        </FormField>
                        <FormField name="email">
                            <FormLabel>メールアドレス</FormLabel>
                            <FormControl asChild>
                                <TextInput type="email" required />
                            </FormControl>
                            <FormMessage match="valueMissing">
                                メールアドレスを入力してください
                            </FormMessage>
                            <FormMessage match="typeMismatch">メールアドレスの形式が誤っています</FormMessage>
                        </FormField>
                        <FormField name="tel">
                            <FormLabel>電話番号</FormLabel>
                            <FormControl asChild>
                                <TextInput type="tel" required />
                            </FormControl>
                            <FormMessage match="valueMissing">
                                電話番号を入力してください
                            </FormMessage>
                            <FormMessage match="typeMismatch">電話番号の形式が誤っています</FormMessage>
                        </FormField>
                        <FormField name="comment">
                            <FormLabel>お問い合わせ内容</FormLabel>
                            <FormControl asChild>
                                <TextArea required />
                            </FormControl>
                            <FormMessage match="valueMissing">
                                お問い合わせ内容を入力してください
                            </FormMessage>
                        </FormField>
                    </div>
                </div>
                <FormSubmit asChild className="mt-20">
                    <Button isLoading={isLoading}>問い合わせる</Button>
                </FormSubmit>
            </FormRoot>
        </div>
    )
}
