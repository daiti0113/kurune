import { postItem } from '@/libs/microcms';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json()
    console.log({body})

    try {
        const res = await postItem(body)
        console.log({res})
        return NextResponse.json(res)
    } catch (e) {
        console.error(e)
        return NextResponse.json(e)
    }
}
