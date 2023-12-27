import { getCategoryList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import { Suspense } from 'react';
import { Loading } from '@/components/atoms/Loading';
import { Providers } from './Providers';
import Analytics from "@/components/Analytics";
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { InstagramBanner } from '@/components/organisms/InstagramBanner';
import { Divider } from '@/components/atoms/Divider';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'kurune - 沖縄県内限定の手渡しフリマサイト',
  description: 'kuruneは、古着・ハンドメイドを中心とした沖縄の商品が一覧できるフリマサイトです。会員登録が不要で、取引手数料等もかからないため、お気軽に出品いただけます。',
  openGraph: {
    title: 'kurune - 沖縄県内限定の手渡しフリマサイト',
    description: 'kuruneは、古着・ハンドメイドを中心とした沖縄の商品が一覧できるフリマサイトです。会員登録が不要で、取引手数料等もかからないため、お気軽に出品いただけます。',
    images: '/ogp.png',
  },
  alternates: {
    canonical: '/',
  },
  twitter: {
    card: "summary",
    site: process.env.BASE_URL || "https://kurune.okinawa",
    title: 'kurune - 沖縄県内限定の手渡しフリマサイト',
    images: "/ogp.png"
  }
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const categories = await getCategoryList({
    limit: LIMIT,
  });

  return (
    <Providers>
      <html lang="ja">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#208da0" />
        </head>
        <body className="h-screen flex flex-col">
          <Suspense>
            {/* Google Analytics の設定 */}
            <Analytics />
          </Suspense>
          <Header />
          <Nav categories={categories.contents} />
          {/* MEMO: インスタグラムフォロワー獲得施策のバナー */}
          <InstagramBanner />
          <Divider className="my-6" />
          <Link href="/register" className="self-center mb-10"><Button>商品を出品する</Button></Link>
          <main className="flex flex-col flex-1 px-6">
            <Suspense fallback={<div className="flex h-full items-center justify-center"><Loading /></div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
