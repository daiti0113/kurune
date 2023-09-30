import { CONTACT_URL } from '@/constants';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl self-center py-20 px-6">
      <h1 className="text-2xl font-bold text-center">プライバシーポリシー</h1>

      <p className="mt-6">
        このプライバシーポリシーは、<Link href="https://omochi-okinawa.com" className="underline">Omochi</Link>（以下、「私たち」または「当サービス」）がユーザーの個人情報の取り扱いに関する方針を説明するものです。ユーザーが当サービスを利用する際に提供される個人情報は、以下の方針に従って取り扱われます。
      </p>

      <h2 className="font-bold mt-6">1. 取得する情報</h2>
      <p>
        当サービスでは、ユーザーがサービスを利用する際に提供される以下の情報を収集する場合があります。
      </p>
      <ul className="mt-2 list-disc list-inside">
        <li>氏名</li>
        <li>メールアドレス</li>
        <li>電話番号</li>
        <li>その他の個人情報（例：住所、誕生日など）</li>
      </ul>

      <h2 className="font-bold mt-6">2. 取得した情報の利用</h2>
      <p>取得した個人情報は、以下の目的のために利用されることがあります。</p>
      <ul className="mt-2 list-disc list-inside">
        <li>ユーザーの識別と連絡</li>
        <li>サービス提供とカスタマーサポート</li>
        <li>サービスの改善とカスタマイズ</li>
        <li>法的な要求や法的な義務の遂行</li>
      </ul>

      <h2 className="font-bold mt-6">3. 情報の共有</h2>
      <p>
        私たちは、ユーザーの個人情報を第三者と共有することはありませんが、以下の場合に情報を共有することがあります。
      </p>
      <ul className="mt-2 list-disc list-inside">
        <li>ユーザーの明示的な同意がある場合</li>
        <li>法的要求や規制に従う必要がある場合</li>
        <li>サービス提供パートナーに情報の一部またはすべてを提供する場合</li>
      </ul>

      <h2 className="font-bold mt-6">4. ユーザーの権利</h2>
      <p>ユーザーは、自身の個人情報に関して以下の権利を行使できます。</p>
      <ul className="mt-2 list-disc list-inside">
        <li>情報のアクセスと修正</li>
        <li>情報の削除</li>
        <li>情報の移転性</li>
      </ul>

      <h2 className="font-bold mt-6">5. プライバシーポリシーの変更</h2>
      <p>
        私たちは、プライバシーポリシーを変更する場合があります。変更がある場合、ウェブサイトやサービスを通じて通知します。新しいポリシーは公表された日から有効となります。
      </p>

      <h2 className="font-bold mt-6">6. お問い合わせ先</h2>
      <p>プライバシーポリシーに関する質問や要望がある場合、<Link className="text-primary-500 underline" href={CONTACT_URL}>お問合せフォーム</Link>よりお気軽にご連絡ください。</p>
    </div>
  );
}
