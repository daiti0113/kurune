"use client"

import { Button } from "@/components/atoms/Button";
import { CheckboxCore } from "@/components/atoms/CheckboxCore";
import { TextArea } from "@/components/atoms/TextArea";
import { InputContainer } from "@/components/molecules/InputContainer";
import { TextInput } from "@/components/molecules/TextInput";
import { PostEmailNotifyPayload } from "@/libs/kuruneApi";
import { Article, Comment, PostCommentPayload } from "@/libs/microcms";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterOptions, useForm } from "react-hook-form";

type FormData = PostCommentPayload

type CommentFormProps = {
    article: Article
}

const options: {[key in keyof FormData]?: RegisterOptions<FormData, key>} = {
    name: {
        required: "名前を入力してください"
    },
    email: {
        required: "メールアドレスを入力してください",
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "メールアドレスの形式が誤っています",
       },
     },
     tel: {
        required: "電話番号を入力してください",
     },
    comment: {
        required: "お問い合わせ内容を入力してください"
    },
    agreement: {
        required: "このサービスを利用するには、プライバシーポリシーと利用規約に同意する必要があります",
    }
}

export const CommentForm: React.FC<CommentFormProps> = ({article}) => {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const router = useRouter()

    const createCommentMutation = useMutation({
        mutationFn: async (data: PostCommentPayload) => {
            const res = await fetch("/api/comments/create", { method: "POST", body: JSON.stringify(data) })
        },
    })
    const sendEmailMutation = useMutation({
        mutationFn: async (comment: Comment) => {
            const res = await fetch("/api/notify/email", { method: "POST", body: JSON.stringify({article, comment} as PostEmailNotifyPayload) })
        },
    })
    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true)
        await createCommentMutation.mutateAsync(data)
        await sendEmailMutation.mutateAsync(data)
        reset()
        router.push(`/comment/complate?item=${article.id}`)
    })

    return (
        <div className="mt-16">
            <h1 className="text-2xl font-bold text-neutral-400">購入希望またはお問い合わせの連絡をする</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <div className="mt-4 flex flex-col gap-10">
                        <TextInput label="名前" errorMessage={errors.name?.message} {...register("name", options.name)} />
                        <TextInput label="メールアドレス" errorMessage={errors.email?.message} {...register("email", options.email)} type="email" />
                        <TextInput label="電話番号" errorMessage={errors.tel?.message} {...register("tel", options.tel)} type="tel" />
                        <InputContainer label="お問い合わせ内容" errorMessage={errors.comment?.message}>
                            <TextArea {...register("comment", options.comment)} />
                        </InputContainer>
                        <InputContainer errorMessage={errors.agreement?.message} >
                            <CheckboxCore {...register("agreement", options.agreement)} label={<><Link href={"/privacy"} target="_blank" className="text-primary-500 underline">プライバシーポリシー</Link>、<Link href={"/tos"} target="_blank" className="text-primary-500 underline">利用規約</Link> に同意する</>} />
                        </InputContainer>
                    </div>
                </div>
                <Button type="submit" className="w-full mt-10 max-w-[500px]" isLoading={isLoading}>問い合わせる</Button>
            </form>
        </div>
    )
}
