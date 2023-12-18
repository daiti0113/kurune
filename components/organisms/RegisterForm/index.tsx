"use client"

import { Button } from "@/components/atoms/Button";
import { CheckboxCore } from "@/components/atoms/CheckboxCore";
import { ImageInput } from "@/components/atoms/ImageInput";
import { Loading } from "@/components/atoms/Loading";
import { Select } from "@/components/atoms/Select";
import { TextArea } from "@/components/atoms/TextArea";
import { Toast } from "@/components/atoms/Toast";
import { InputContainer } from "@/components/molecules/InputContainer";
import { TextInput } from "@/components/molecules/TextInput";
import { cities } from "@/constants";
import { useUpload } from "@/hooks/s3";
import { compressImage } from "@/libs/image";
import { PostItemPayload, Category, Article, PatchItemPayload } from "@/libs/microcms";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterOptions, useForm } from "react-hook-form";

export const revalidate = 0;

type FormData = Omit<PostItemPayload | PatchItemPayload, "image"> & {
    image: FileList
}

type RegisterProps = {
    categories: Category[]
    defaultValue?: Article
}

const options: {[key in keyof FormData]?: RegisterOptions<FormData, key>} = {
    image: {
        required: "画像または動画を選択してください",
        validate: (files: FileList) => files[0].size < 128000000 || "128MB 以下のファイルを選択してください"
    },
    title: {
        required: "タイトルを入力してください"
    },
    price: {
       required: "価格を入力してください",
       valueAsNumber: true
    },
    cities: {
        required: "受け渡し場所を入力してください",
    },
    categories:{
       required: "カテゴリを選択してください",
       setValueAs: (categoryId) => [categoryId],
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
    agreement: {
        required: "このサービスを利用するには、プライバシーポリシーと利用規約に同意する必要があります",
    },
    password: {
        required: "商品の編集・削除に利用するパスワードを指定してください",
    }
}

export const RegisterForm = ({ categories, defaultValue }: RegisterProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { upload } = useUpload()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [error, setError] = useState("")

    const mutation = useMutation({
        mutationFn: async (data: PostItemPayload | Omit<PatchItemPayload, "id">) => {
            const res = await fetch(`/api/items/${defaultValue ? "edit" : "create"}`, { method: defaultValue ? "PATCH" : "POST", body: JSON.stringify({...data, id: defaultValue?.id}) })
            const parsed = await res.json()
            if (!parsed.id) throw new Error(parsed?.error || "予期せぬエラーが発生しました")
            router.push(`/articles/${parsed.id}`)
        },
    })

    const onSubmit = handleSubmit(async data => {
        setIsLoading(true)
        let fileUrl: string | null = null
        if (data.image.length > 0) {
            const compressed = (/.(avi|mp4|mov|wmv|flv|mpg|quicktime)$/i.test(data.image.item(0)?.name || "")) ? data.image[0] : await compressImage(data.image[0])
            fileUrl = await upload(compressed)
        }
        try {
            await mutation.mutateAsync({...data, image: fileUrl || undefined})
        } catch (e: any) {
            setIsLoading(false)
            setError(e.message)
        }
    });

    return isLoading ? <div className="flex h-full items-center justify-center"><Loading /></div> : (
        <div className="w-full max-w-[500px]">
            <h1 className="text-xl font-bold">{defaultValue ? "商品を編集する" : "出品する"}</h1>
            {defaultValue && (
                <div className="mt-6 text-sm">
                    <p>メールアドレスと編集用パスワードの組み合わせが正しいのみ編集が可能です。</p>
                    <p>個人情報については、再度入力をお願いいたします。</p>
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div className="mt-10">
                    <h2 className="text-lg font-bold">商品情報</h2>
                    <div className="mt-4 flex flex-col gap-10">
                        <InputContainer label="商品画像または動画" errorMessage={errors.image?.message}>
                            <ImageInput {...register("image", defaultValue ? undefined : options.image)} />
                        </InputContainer>
                        <TextInput label="タイトル" errorMessage={errors.title?.message} {...register("title", options.title)} defaultValue={defaultValue?.title} />
                        <TextInput label="価格" unit="円" errorMessage={errors.price?.message} type="number" {...register("price", options.price)} defaultValue={defaultValue?.price} />
                        <InputContainer label="受け渡し場所（複数選択可）" errorMessage={errors.cities?.message}>
                            <Select multiple {...register("cities", options.cities)} defaultValue={defaultValue?.cities}>
                                {cities.map((city) => <option key={city.id} value={city.name}>{city.name}</option>)}
                            </Select>
                        </InputContainer>
                        <InputContainer label="カテゴリ" errorMessage={errors.categories?.message}>
                            <Select {...register("categories", options.categories)} defaultValue={defaultValue?.categories?.[0].id}>
                                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </Select>
                        </InputContainer>
                        <InputContainer label="説明" errorMessage={errors.description?.message}>
                            <TextArea {...register("description", options.description)} defaultValue={defaultValue?.description} />
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
                <div className="mt-20">
                    <div className="mt-4 flex flex-col gap-10">
                        <TextInput type="password" autoComplete="off" label="編集用パスワード" errorMessage={errors.password?.message} description="※出品した商品を編集する際に必要になります" {...register("password", options.password)} />
                        <InputContainer errorMessage={errors.agreement?.message} >
                            <CheckboxCore {...register("agreement", options.agreement)} label={<><Link href={"/privacy"} target="_blank" className="text-primary-500 underline">プライバシーポリシー</Link>、<Link href={"/tos"} target="_blank" className="text-primary-500 underline">利用規約</Link> に同意する</>} />
                        </InputContainer>
                    </div>
                </div>
                {defaultValue && (
                    <InputContainer className="mt-10" >
                        <CheckboxCore {...register("sold")} label={<span className="font-semibold">この商品を販売終了にする</span>} />
                    </InputContainer>
                )}
                <Button type="submit" className="w-full mt-10">{defaultValue ? "商品情報を更新する" : "出品する"}</Button>
            </form>
            <Toast isShown={Boolean(error)}>{error}</Toast>
        </div>
    )
}
