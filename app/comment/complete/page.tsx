'use client';

import { Button } from '@/components/atoms/Button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CommentComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get('item') || undefined;

  return (
    <div className="max-w-3xl self-center py-20">
      <h1 className="text-lg font-bold text-center md:text-xl">お問い合わせが完了しました</h1>

      <p className="mt-6 text-center">
        <span className="inline-block">お問い合わせが完了しました。</span>
        <span className="inline-block">記入いただいたメールアドレス宛に</span>
        <span className="inline-block">内容確認メールを送信いたしました。</span>
        <span className="inline-block">ご確認のうえ、出品者からのご連絡をお待ち下さい。</span>
      </p>
      {itemId && (
        <div className="flex items-center justify-center mt-20">
          <Button onClick={() => router.push(`/articles/${itemId}`)}>商品詳細へ戻る</Button>
        </div>
      )}
    </div>
  );
}
