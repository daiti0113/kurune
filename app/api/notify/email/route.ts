import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const createContent = (comment: string) => `<p><strong>※本メールは通知専用です。こちらのメールには返信できませんのでご注意ください。</strong><p>
<h1>お問い合わせ内容</h1>
<p>${comment}</p>
`

export async function POST(request: NextRequest) {
    const body = await request.json()
    console.log({body})

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const res = await resend.emails.send({
            from: 'kurune-notify@omochi-okinawa.com',
            to: body.toAdress,
            subject: `【${body.itemName}に関するお問い合わせ】${body.fromName}さんからコメントが来ています`,
            html: createContent(body.comment)
        });
        console.log({res})
        return NextResponse.json({message: "success"})
    } catch (e) {
        console.error(e)
        return NextResponse.json(e)
    }
}
