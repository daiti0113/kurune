"use client"

import { Button } from "@/components/atoms/Button";
import { ImageInput } from "@/components/atoms/ImageInput";
import { TextArea } from "@/components/atoms/TextArea";
import { TextInput } from "@/components/atoms/TextInput";
import Form from "@/components/organisms/Form";

export default function Register() {
    return (
        <div>
            <h1 className="text-xl font-bold">出品する</h1>
            <Form>
                <div className="mt-10">
                    <h2 className="text-lg font-bold">商品情報</h2>
                    <div className="mt-4 flex flex-col gap-10">
                        <Form.Field name="image">
                            <Form.Label>商品画像</Form.Label>
                            <Form.Control asChild>
                                <ImageInput required />
                            </Form.Control>
                            <Form.Message match="valueMissing">
                                画像を添付してください
                            </Form.Message>
                        </Form.Field>
                        <Form.Field name="title">
                            <Form.Label>タイトル</Form.Label>
                            <Form.Control asChild>
                                <TextInput required />
                            </Form.Control>
                            <Form.Message match="valueMissing">
                                タイトルを入力してください
                            </Form.Message>
                        </Form.Field>
                        <Form.Field name="description">
                            <Form.Label>説明</Form.Label>
                            <Form.Control asChild>
                                <TextArea required />
                            </Form.Control>
                            <Form.Message match="valueMissing">
                                説明を入力してください
                            </Form.Message>
                        </Form.Field>
                    </div>
                </div>
                <div className="mt-20">
                    <h2 className="text-lg font-bold">出品者情報</h2>
                    <div className="mt-4 flex flex-col gap-10">
                        <Form.Field name="name">
                            <Form.Label>名前</Form.Label>
                            <Form.Control asChild>
                                <TextInput required />
                            </Form.Control>
                            <Form.Message match="valueMissing">
                                名前を入力してください
                            </Form.Message>
                        </Form.Field>
                        <Form.Field name="email">
                            <Form.Label>メールアドレス</Form.Label>
                            <Form.Control asChild>
                                <TextInput type="email" required />
                            </Form.Control>
                            <Form.Message match="valueMissing">
                                メールアドレスを入力してください
                            </Form.Message>
                            <Form.Message match="typeMismatch">メールアドレスの形式が誤っています</Form.Message>
                        </Form.Field>
                        <Form.Field name="tel">
                            <Form.Label>電話番号</Form.Label>
                            <Form.Control asChild>
                                <TextInput type="tel" required />
                            </Form.Control>
                            <Form.Message match="valueMissing">
                                電話番号を入力してください
                            </Form.Message>
                            <Form.Message match="typeMismatch">電話番号の形式が誤っています</Form.Message>
                        </Form.Field>
                    </div>
                </div>
                <Form.Submit asChild className="mt-20">
                    <Button>出品する</Button>
                </Form.Submit>
            </Form>
        </div>
    )
}
