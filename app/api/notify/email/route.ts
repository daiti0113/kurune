import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { PostEmailNotifyPayload } from '@/libs/kuruneApi';

const createContentForSeller = ({ article, comment }: PostEmailNotifyPayload) => {
    return (
        `<p><strong>※本メールは通知専用です。<br />こちらのメールには返信できませんのでご注意ください。</strong></p>
        <p>以下の商品について、お問い合わせがありました。</p>

        <h2>商品情報</h2>
        <p><strong>【タイトル】</strong><br />${article.title}</p>
        <p><strong>【価格】</strong><br />${article.price.toLocaleString()}</p>

        <h2>お問い合わせ内容</h2>
        <p>下記のメールアドレスに直接ご連絡ください。</p>
        <p><strong>【氏名】</strong><br />${comment.name}</p>
        <p><strong>【メールアドレス】</strong><br />${comment.email}</p>
        <p><strong>【内容】</strong></p>
        <p>${comment.comment}</p>`
    )
}

const createContentForBuyer = ({ article, comment }: PostEmailNotifyPayload) => {
    const articleUrl = `${process.env.BASE_URL}/articles/${article.id}`
    return (
        `<p>以下の投稿について、お問い合わせが完了しました。</p>
        <p>出品者からのご連絡をお待ち下さい。</p>
        <a href="${articleUrl}">${articleUrl}</a>
        <h2>お問い合わせ内容</h2>
        <p><strong>【氏名】</strong><br />${comment.name}</p>
        <p><strong>【メールアドレス】</strong><br />${comment.email}</p>
        <p>${comment.comment}</p>`
    )
}

export async function POST(request: NextRequest) {
    const body = await request.json() as PostEmailNotifyPayload
    console.log({body})

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const resForSeller = await resend.emails.send({
            from: 'kurune-notify@omochi-okinawa.com',
            to: body.article.email,
            subject: `【${body.article.title}に関するお問い合わせ】${body.comment.name}さんからコメントが来ています`,
            html: createContentForSeller(body)
        });
        console.log("売り手への確認メール:", { resForSeller })
        const resForBuyer = await resend.emails.send({
            from: 'kurune-notify@omochi-okinawa.com',
            to: body.comment.email,
            subject: `【kurune】お問い合わせが完了しました`,
            html: createContentForBuyer(body)
        });
        console.log("買い手への確認メール:", { resForBuyer })
        return NextResponse.json({message: "success"})
    } catch (e) {
        console.error(e)
        return NextResponse.json(e)
    }
}
