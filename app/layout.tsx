import { getCategoryList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import { Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { Suspense } from 'react';
import { Loading } from '@/components/atoms/Loading';
import { Providers } from './Providers';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'kurune | 沖縄のフリマサイト',
  description: '沖縄県限定の手渡し専用フリマサイトです。',
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
        <body className="h-screen flex flex-col">
          <Header />
          <Nav categories={categories.contents} />
          <Suspense fallback={<Loading />}>
            <main className="flex flex-col flex-1 px-6">{children}</main>
          </Suspense>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
