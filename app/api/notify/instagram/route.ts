import { Item } from '@/libs/microcms';
import { NextRequest, NextResponse } from 'next/server';

const INSTAGRAM_BUSINESS_ID = process.env.INSTAGRAM_BUSINESS_ID
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN

const method = "POST"
const headers = {
    "Accept": "*/*",
    "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + INSTAGRAM_ACCESS_TOKEN,
}


export async function POST(request: NextRequest) {
    const data = await request.json()
    console.log({data})
    console.log({contents: data?.contents})
    console.log({new: data?.contents?.new})

    if (data.type !== "new") return NextResponse.json({message: "success"})

    const itemId = data.contents.new.id
    const itemInfo = data.contents.new.publishValue as Item

    const params = {
        image_url: itemInfo.image,
        caption: `.\nAPIからのテスト投稿\n詳細はこちら > https://${process.env.BASE_URL}/articles/${itemId}`,
        media_type: ""
    }

    try {
        const res = await fetch(`https://graph.facebook.com/v18.0/${INSTAGRAM_BUSINESS_ID}/media?access_token`, {
            method,
            headers,
            body: JSON.stringify(params)
        })
        const body = await res.json() as any
        console.log({body})
        await fetch(`https://graph.facebook.com/v18.0/${INSTAGRAM_BUSINESS_ID}/media_publish?access_token`, {
            method,
            headers,
            body: JSON.stringify({creation_id: body.id})
        })
        return NextResponse.json({message: "success"})
    } catch (e) {
        console.error(e)
        return NextResponse.json(e)
    }
}
