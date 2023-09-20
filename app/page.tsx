import { getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

export const revalidate = 0;

export default async function Page() {
  const data = await getList({
    limit: LIMIT,
  });
  return (
    <>
      <Link href="/register" className="self-center mb-10"><Button>商品を出品する</Button></Link>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} />
    </>
  );
}
