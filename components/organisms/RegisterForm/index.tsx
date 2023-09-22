"use client"

import { Button } from "@/components/atoms/Button";
import { ImageInput } from "@/components/atoms/ImageInput";
import { Loading } from "@/components/atoms/Loading";
import { Select } from "@/components/atoms/Select";
import { TextArea } from "@/components/atoms/TextArea";
import { InputContainer } from "@/components/molecules/InputContainer";
import { TextInput } from "@/components/molecules/TextInput";
import { useUpload } from "@/hooks/s3";
import { PostItemPayload, Tag } from "@/libs/microcms";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterOptions, useForm } from "react-hook-form";

type FormData = Omit<PostItemPayload, "image"> & {
    image: FileList
}

type RegisterProps = {
    tags: Tag[]
}

const options: {[key in keyof FormData]?: RegisterOptions<FormData, key>} = {
    image: {
        required: "画像を選択してください",
    },
    title: {
        required: "タイトルを入力してください"
    },
    price: {
       required: "価格を入力してください",
       valueAsNumber: true
    },
    tags:{
       required: "カテゴリを選択してください",
    },
    description: {
       required: "説明を入力してください",
    },
    name: {
       required: "名前を入力してください",
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
}

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
                        <InputContainer label="商品画像" errorMessage={errors.image?.message}>
                            <ImageInput {...register("image", options.image)} />
                        </InputContainer>
                        <TextInput label="タイトル" errorMessage={errors.title?.message} {...register("title", options.title)} />
                        <TextInput label="価格" errorMessage={errors.price?.message} type="number" {...register("price", options.price)} />
                        <InputContainer label="カテゴリ（複数選択可）" errorMessage={errors.tags?.message}>
                            <Select multiple {...register("tags", options.tags)} >
                                {tags.map((tag) => <option key={tag.id} label={tag.name} value={tag.id} />)}
                            </Select>
                        </InputContainer>
                        <InputContainer label="説明" errorMessage={errors.description?.message}>
                            <TextArea {...register("description", options.description)} />
                        </InputContainer>
                    </div>
                </div>
                <div className="mt-20">
                    <h2 className="text-lg font-bold">出品者情報</h2>
                    <div className="mt-4 flex flex-col gap-10">
                        <TextInput label="名前" errorMessage={errors.name?.message} {...register("name", options.name)} />
                        <TextInput label="メールアドレス" errorMessage={errors.email?.message} type="email" {...register("email", options.email)} />
                        <TextInput label="電話番号" errorMessage={errors.tel?.message} type="tel" {...register("tel", options.tel)} />
                    </div>
                </div>
                <Button type="submit">出品する</Button>
            </form>
        </div>
    )
}
