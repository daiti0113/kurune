import { getDetail, patchItem, PatchItemPayload } from '@/libs/microcms';
import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcrypt';

export async function PATCH(request: NextRequest) {
    const {password, ...rest} = await request.json() as PatchItemPayload
    console.log({rest})

    try {
        const { password: hashedPassword, email } = await getDetail(rest.id)
        const isEmailOk = rest.email === email
        const isPasswordOk = await compare(password, hashedPassword);
        if (!isEmailOk || !isPasswordOk) throw new Error("メールアドレスまたはパスワードが一致しません")
        const res = await patchItem({...rest, password: hashedPassword})
        console.log({res})
        return NextResponse.json(res)
    } catch (e: any) {
        console.error(e)
        return NextResponse.json({error: e.message}, {status: 403})
    }
}
