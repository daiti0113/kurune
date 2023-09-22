"use client"

import { Button } from "@/components/atoms/Button";
import { ImageInput } from "@/components/atoms/ImageInput";
import { Label } from "@/components/atoms/Label";
import { Loading } from "@/components/atoms/Loading";
import { Select } from "@/components/atoms/Select";
import { TextArea } from "@/components/atoms/TextArea";
import { TextInputCore } from "@/components/atoms/TextInputCore";
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
// TODO: コンポーネント化

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
                        <Label>商品画像</Label>
                        <ImageInput {...register("image")} />
                        {errors.image && <span>画像を添付してください</span>}
                        <Label>タイトル</Label>
                        <TextInputCore required {...register("title")} />
                        {errors.image && <span>タイトルを入力してください</span>}
                        <Label>価格</Label>
                        <TextInputCore required type="number" {...register("price", {valueAsNumber: true})} />
                        {errors.image && <span>タイトルを入力してください</span>}
                        <Label>カテゴリ（複数選択可）</Label>
                        <Select required multiple {...register("tags")} >
                            {tags.map((tag) => <option key={tag.id} label={tag.name} value={tag.id} />)}
                        </Select>
                        {errors.image && <span>タイトルを入力してください</span>}
                        <Label>説明</Label>
                        <TextArea required {...register("description")} />
                        {errors.image && <span>説明を入力してください</span>}
                    </div>
                </div>
                <div className="mt-20">
                    <h2 className="text-lg font-bold">出品者情報</h2>
                    <div className="mt-4 flex flex-col gap-10">
                        <Label>名前</Label>
                        <TextInputCore required {...register("name")} />
                        {errors.image && <span>名前を入力してください</span>}
                        <Label>メールアドレス</Label>
                        <TextInputCore type="email" required {...register("email")} />
                        {errors.image && <span>メールアドレスを入力してください</span>}
                        <Label>電話番号</Label>
                        <TextInputCore type="tel" required {...register("tel")} />
                        {errors.image && <span>電話番号を入力してください</span>}
                    </div>
                </div>
                <Button type="submit">出品する</Button>
            </form>
        </div>
    )
}
