import { getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';
import { Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { Suspense } from 'react';
import { Loading } from '@/components/atoms/Loading';
import { Providers } from './Providers';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'Simple Blog',
  description: 'A simple blog presented by microCMS',
  openGraph: {
    title: 'Simple Blog',
    description: 'A simple blog presented by microCMS',
    images: '/ogp.png',
  },
  alternates: {
    canonical: '/',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const tags = await getTagList({
    limit: LIMIT,
  });
  return (
    <Providers>
      <html lang="ja">
        <body>
          <Header />
          <Nav tags={tags.contents} />
          <Link href="/register"><Button>商品を出品する</Button></Link>
          <Suspense fallback={<Loading />}>
            <main className={styles.main}>{children}</main>
          </Suspense>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
