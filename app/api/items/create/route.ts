import { postItem, PostItemPayload } from '@/libs/microcms';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function POST(request: NextRequest) {
    const {password, ...rest} = await request.json() as PostItemPayload
    console.log({rest})

    try {
        const hashedPassword = await hash(password, 5);
        const res = await postItem({...rest, password: hashedPassword})
        console.log({res})
        return NextResponse.json(res)
    } catch (e) {
        console.error(e)
        return NextResponse.json(e)
    }
}
