import { postItem } from '@/libs/microcms';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json()
    console.log({body})

    const itemInfo = {
        title: body.title,
        description: body.description,
    }

    const userInfo = {
        name: body.name,
        email: body.email,
        tel: body.tel
    }

    try {
        const res = await postItem(itemInfo, userInfo)
        console.log({res})
        return NextResponse.json(res)
    } catch (e) {
        console.error(e)
        return NextResponse.json(e)
    }
}
