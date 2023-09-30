import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import styles from './index.module.css';
import CategoryList from '../CategoryList';
import { CommentForm } from '../organisms/CommentForm';
import Link from 'next/link';

type Props = {
  data: Article;
};

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
          <img
            src={data.image}
            alt=""
            className={styles.thumbnail}
          />
        </picture>
        <div className="flex-1 w-full">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <CategoryList categories={data.categories} />
          <span className="text-neutral-600">¥<span className="text-2xl font-semibold text-primary-500">{data.price.toLocaleString()}</span></span>
          <div>
            <p className="my-10 whitespace-pre-wrap">{data.description}</p>
          </div>
          <PublishedDate date={data.publishedAt || data.createdAt} />
          <Link href={`/articles/${data.id}/edit`} className="text-primary-500 underline">商品を編集する</Link>
          <CommentForm article={data} />
        </div>
      </div>
    </main>
  );
}
