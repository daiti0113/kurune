import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { PostEmailNotifyPayload } from '@/libs/kuruneApi';
import { Article, Comment } from '@/libs/microcms';

const createContent = (article: Article, comment: Comment) => {
    const articleUrl = `${process.env.BASE_URL}/articles/${article.id}`
    return (
        `<p><strong>※本メールは通知専用です。<br />こちらのメールには返信できませんのでご注意ください。</strong></p>
        <p>以下の投稿について、お問い合わせがありました。</p>
        <a href="${articleUrl}">${articleUrl}</a>
        <p>下記のメールアドレスに直接ご連絡ください。</p>
        <h2>お問い合わせ内容</h2>
        <p><strong>【氏名】</strong>${comment.name}</p>
        <p><strong>【メール】</strong>${comment.email}</p>
        <p><strong>【内容】</strong></p>
        <p>${comment.comment}</p>`
    )
}

export async function POST(request: NextRequest) {
    const body = await request.json() as PostEmailNotifyPayload
    console.log({body})

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const res = await resend.emails.send({
            from: 'kurune-notify@omochi-okinawa.com',
            to: body.article.email,
            subject: `【${body.article.title}に関するお問い合わせ】${body.comment.name}さんからコメントが来ています`,
            html: createContent(body.article, body.comment)
        });
        console.log({res})
        return NextResponse.json({message: "success"})
    } catch (e) {
        console.error(e)
        return NextResponse.json(e)
    }
}
