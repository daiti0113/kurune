import { CONTACT_URL } from "@/constants";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl self-center py-20 px-6">
      <h1 className="text-2xl font-bold text-center">kurune 利用規約</h1>

      <h2  className="font-bold mt-6">1. 受け入れ</h2>
      <p>
        この個人売買掲示板サービス（以下、「本サービス」）を利用する前に、以下の利用規約を注意深くお読みいただき、理解し、受け入れていただく必要があります。本サービスを利用することにより、これらの利用規約に同意したものとみなされます。もし、これらの規約に同意できない場合、本サービスの利用をお控えください。
      </p>

      <h2  className="font-bold mt-6">2. サービスの概要</h2>
        <ol className="list-decimal list-inside">
          <li>
            本サービスは、会員登録不要で個人売買を行うための掲示板を提供します。出品者は自身の氏名、メールアドレス、電話番号、商品情報を入力し、商品を掲載することができます。購入希望者は出品者と連絡を取り、取引を行うことができます。
          </li>
          <li>
            出品者が提供する個人情報は、プライバシーポリシーに従って管理されます。個人情報は掲示板には表示されません。
          </li>
        </ol>

      <h2  className="font-bold mt-6">3. ユーザーの責任</h2>
        <ol className="list-decimal list-inside">
          <li>
            本サービスを利用するユーザーは、提供された情報を正確かつ正当なものとし、他のユーザーに対して誤解を招かないようにする責任があります。
          </li>
          <li>
            ユーザーは、本サービスを不正に使用したり、他のユーザーに対して迷惑をかける行為を行わないこととします。
          </li>
        </ol>

      <h2  className="font-bold mt-6">4. 取引の責任</h2>
        <ol className="list-decimal list-inside">
          <li>
            本サービスを通じて行われる取引は、ユーザー間で直接行われます。本サービスは取引の一環として発生するトラブルについて責任を負いません。
          </li>
          <li>
            ユーザーは、取引に関連するリスクを自己負担するものとし、本サービスの運営者に対して一切の責任を追求しないこととします。
          </li>
        </ol>

      <h2  className="font-bold mt-6">5. 知的財産権</h2>
        <ol className="list-decimal list-inside">
          <li>
            本サービスに含まれるコンテンツやロゴなどの知的財産権は、運営者または関連する権利者に帰属します。ユーザーは、これらの知的財産権を侵害しないこととします。
          </li>
        </ol>

      <h2  className="font-bold mt-6">6. サービスの変更と中断</h2>
        <ol className="list-decimal list-inside">
          <li>
            運営者は、事前の通知なしに本サービスを変更、中断、または終了する権利を有します。これに関連してユーザーに対して責任を負いません。
          </li>
        </ol>

      <h2  className="font-bold mt-6">7. プライバシー</h2>
      <p>
        ユーザーの個人情報の取り扱いについては、本サービスのプライバシーポリシーが適用されます。プライバシーポリシーについては、本サービスのウェブサイトで確認できます。
      </p>

      <h2  className="font-bold mt-6">8. 変更と通知</h2>
      <p>
        運営者は、必要に応じてこれらの利用規約を変更する権利を有します。変更はウェブサイト上での公表をもって通知されたものとみなされます。変更後も本サービスを利用することで、変更後の利用規約に同意したものとみなされます。
      </p>

      <h2  className="font-bold mt-6">9. 連絡先</h2>
      <p>
        本サービスに関するお問い合わせは、<Link className="text-primary-500 underline" href={CONTACT_URL}>お問合せフォーム</Link>よりご連絡ください。
      </p>
    </div>
  );
}
