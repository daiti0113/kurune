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

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'kurune | 沖縄のフリマサイト',
  description: '【会員登録不要】手渡しのみの沖縄県限定フリマサイトです。',
  openGraph: {
    title: 'kurune | 沖縄のフリマサイト',
    description: '沖縄県限定の手渡し専用フリマサイトです。',
    images: '/logo.png',
  },
  alternates: {
    canonical: '/',
  },
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
          <Suspense fallback={<div className="flex h-full items-center justify-center"><Loading /></div>}>
            <main className="flex flex-col flex-1 px-6">{children}</main>
          </Suspense>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
