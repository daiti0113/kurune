"use client"

import { Button } from "@/components/atoms/Button";
import { ImageInput } from "@/components/atoms/ImageInput";
import { Loading } from "@/components/atoms/Loading";
import { TextArea } from "@/components/atoms/TextArea";
import { TextInput } from "@/components/atoms/TextInput";
import { FileInput } from "@/components/molecules/FileInput";
import { FormControl } from "@/components/organisms/Form/FormControl";
import { FormField } from "@/components/organisms/Form/FormField";
import { FormLabel } from "@/components/organisms/Form/FormLabel";
import { FormMessage } from "@/components/organisms/Form/FormMessage";
import { FormRoot } from "@/components/organisms/Form/FormRoot";
import { FormSubmit } from "@/components/organisms/Form/FormSubmit";
import { useUpload } from "@/hooks/s3";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default async function Register() {
    const router = useRouter()
    const [url, setUrl] = useState("");
    const { upload, isLoading } = useUpload()
    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/items/create", { method: "POST", body: JSON.stringify(data) })
            const parsed = await res.json()
            router.push(`/articles/${parsed.id}`)
        },
    })
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await mutation.mutateAsync(Object.fromEntries(new FormData(e.currentTarget)))
    }

    return mutation.isLoading ? <Loading /> : (
        <div>
            <h1 className="text-xl font-bold">出品する</h1>
            <FormRoot onSubmit={onSubmit}>
                <div className="mt-10">
                    <h2 className="text-lg font-bold">商品情報</h2>
                    <div className="mt-4 flex flex-col gap-10">
                        <FormField name="image">
                            <FormLabel>商品画像</FormLabel>
                            <FormControl asChild>
                                <FileInput onDrop={upload} />
                            </FormControl>
                            <FormMessage match="valueMissing">
                                画像を添付してください
                            </FormMessage>
                        </FormField>
                        <FormField name="title">
                            <FormLabel>タイトル</FormLabel>
                            <FormControl asChild>
                                <TextInput required />
                            </FormControl>
                            <FormMessage match="valueMissing">
                                タイトルを入力してください
                            </FormMessage>
                        </FormField>
                        <FormField name="description">
                            <FormLabel>説明</FormLabel>
                            <FormControl asChild>
                                <TextArea required />
                            </FormControl>
                            <FormMessage match="valueMissing">
                                説明を入力してください
                            </FormMessage>
                        </FormField>
                    </div>
                </div>
                <div className="mt-20">
                    <h2 className="text-lg font-bold">出品者情報</h2>
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
                    </div>
                </div>
                <FormSubmit asChild className="mt-20">
                    <Button>出品する</Button>
                </FormSubmit>
            </FormRoot>
        </div>
    )
}
