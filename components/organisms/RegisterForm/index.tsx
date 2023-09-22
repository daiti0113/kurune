"use client"

import { Button } from "@/components/atoms/Button";
import { ImageInput } from "@/components/atoms/ImageInput";
import { Label } from "@/components/atoms/Label";
import { Loading } from "@/components/atoms/Loading";
import { Select } from "@/components/atoms/Select";
import { TextArea } from "@/components/atoms/TextArea";
import { TextInputCore } from "@/components/atoms/TextInputCore";
import { InputContainer } from "@/components/molecules/InputContainer";
import { TextInput } from "@/components/molecules/TextInput";
import { useUpload } from "@/hooks/s3";
import { PostItemPayload, Tag } from "@/libs/microcms";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = Omit<PostItemPayload, "image"> & {
    image: FileList
}

type RegisterProps = {
    tags: Tag[]
}


// TODO: バリデーションルールを追加

export const RegisterForm = ({ tags }: RegisterProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { upload } = useUpload()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const mutation = useMutation({
        mutationFn: async (data: PostItemPayload) => {
            const res = await fetch("/api/items/create", { method: "POST", body: JSON.stringify(data) })
            const parsed = await res.json()
            router.push(`/articles/${parsed.id}`)
        },
    })

    const onSubmit = handleSubmit(async data => {
        setIsLoading(true)
        const fileUrl = await upload(Array.from(data.image))
        fileUrl && await mutation.mutateAsync({...data, image: fileUrl})
    });

    return isLoading ? <Loading /> : (
        <div>
            <h1 className="text-xl font-bold">出品する</h1>
            <form onSubmit={onSubmit}>
                <div className="mt-10">
                    <h2 className="text-lg font-bold">商品情報</h2>
                    <div className="mt-4 flex flex-col gap-10">
                        <TextInput label="商品画像" errorMessage="画像を添付してください" {...register("image")} />
                        <TextInput label="タイトル" errorMessage="タイトルを入力してください" {...register("title")} />
                        <TextInput label="価格" errorMessage="価格を入力してください" type="number" {...register("price", {valueAsNumber: true})} />
                        <InputContainer label="カテゴリ（複数選択可）" errorMessage="カテゴリを選択してください">
                            <Select required multiple {...register("tags")} >
                                {tags.map((tag) => <option key={tag.id} label={tag.name} value={tag.id} />)}
                            </Select>
                        </InputContainer>
                        <InputContainer label="説明" errorMessage="説明を入力してください">
                            <TextArea required {...register("description")} />
                        </InputContainer>
                    </div>
                </div>
                <div className="mt-20">
                    <h2 className="text-lg font-bold">出品者情報</h2>
                    <div className="mt-4 flex flex-col gap-10">
                        <TextInput label="名前" errorMessage="名前を入力してください" {...register("name")} />
                        <TextInput label="メールアドレス" errorMessage="メールアドレスを入力してください" type="email" {...register("email")} />
                        <TextInput label="電話番号" errorMessage="電話番号を入力してください" type="tel" {...register("tel")} />
                    </div>
                </div>
                <Button type="submit">出品する</Button>
            </form>
        </div>
    )
}
