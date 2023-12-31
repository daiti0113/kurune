import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import styles from './index.module.css';
import CategoryList from '../CategoryList';
import { CommentForm } from '../organisms/CommentForm';
import Link from 'next/link';
import { Divider } from '../atoms/Divider';
import Image from 'next/image';

type Props = {
  data: Article;
};

export const revalidate = 0;

export default function Article({ data }: Props) {
  return (
    <main className={styles.main}>
      <div className="flex flex-col gap-10 w-full max-w-6xl md:flex-row">
        <picture className="flex-[1.5_1_0%] max-w-xl">
          <source
            type="image/webp"
            media="(max-width: 640px)"
            srcSet={`${data.image}?fm=webp&w=414 1x, ${data.image}?fm=webp&w=414&dpr=2 2x`}
          />
          <source
            type="image/webp"
            srcSet={`${data.image}?fm=webp&fit=crop&w=960&h=504 1x, ${data.image}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`}
          />
          {/.(avi|mp4|mov|wmv|flv|mpg|quicktime)$/i.test(data.image)
            ? (
              <video
                controls
                muted
                src={data.image}
                className={styles.thumbnail}
              />
            )
            : (
              <Image
                src={data.image}
                alt={data.title}
                width="1080"
                height="1350"
                className={styles.thumbnail}
              />
            ) }
        </picture>
        <div className="flex-1 w-full">
          <h1 className="text-xl font-bold">{data.title}</h1>
          <span className="mt-2 text-neutral-600">¥<span className="text-3xl font-semibold text-primary-500">{data.price.toLocaleString()}</span></span>
          <h2 className="mt-12 text-2xl font-bold text-neutral-400">商品説明</h2>
          <div>
            <p className="mt-4 mb-16 whitespace-pre-wrap">{data.description}</p>
          </div>
          <PublishedDate date={data.publishedAt || data.createdAt} />
          <Link href={`/articles/${data.id}/edit`} className="text-primary-500 underline">商品を編集する</Link>
          <Divider className="my-10" />
          <div>
            <h3 className="text-lg font-bold text-neutral-400">カテゴリ</h3>
            <CategoryList categories={data.categories} />
            <h3 className="font-bold mt-4 text-neutral-400">受け渡し場所</h3>
            <div className="flex items-center my-2">
              {data.cities.map((city) => <p key={city} className="text-[12.8px] py-1 px-2">{city}</p>)}
            </div>
          </div>
          <Divider className="my-10" />
          {data.sold
            ? (
              <div className="mb-20">
                <h2 className="text-xl font-bold text-primary-500 sm:text-2xl lg:text-3xl">Thank you! SOLD OUT!</h2>
                <span className="text-gray-500">この商品は販売終了しました。</span>
              </div>
            )
            : <CommentForm article={data} />}
        </div>
      </div>
    </main>
  );
}
