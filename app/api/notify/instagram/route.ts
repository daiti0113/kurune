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

const createCaption = (itemInfo: Item, itemId: string) => {
    return `.\n${itemInfo.title}\n¥${itemInfo.price.toLocaleString()}\n\n【商品説明】\n${itemInfo.description}\n\n※商品に関するお問い合わせはkurune公式サイトよりお願いいたします。\n\n---\n\n沖縄限定の手渡しフリマサイト『kurune』\nkuruneは、古着・ハンドメイドを中心とした沖縄の商品が一覧できるフリマサイトです。会員登録が不要で、取引手数料等もかからないため、お気軽に出品いただけます。\n\n公式サイトは @kurune.okinawa のリンクから飛べます！`
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
        caption: createCaption(itemInfo, itemId),
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
