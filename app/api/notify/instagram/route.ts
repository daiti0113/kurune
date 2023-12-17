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
const params = {
    image_url: "https://kurune-images.s3.ap-northeast-1.amazonaws.com/1d3be049-2f09-445c-913d-496c4e6b9cea.jpeg",
    caption: "APIからのテスト投稿",
    media_type: ""
}

export async function POST(request: NextRequest) {
    console.log({request})
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
