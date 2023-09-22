import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import styles from './index.module.css';
import TagList from '../TagList';
import { CommentForm } from '../organisms/CommentForm';

type Props = {
  data: Article;
};

export default function Article({ data }: Props) {
  return (
    <main className={styles.main}>
      <div className="flex gap-10 w-full">
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
          <h1 className={styles.title}>{data.title}</h1>
          <TagList tags={data.tags} />
          <p className={styles.description}>{data.description}</p>
          <PublishedDate date={data.publishedAt || data.createdAt} />
          <CommentForm article={data} />
        </div>
      </div>
    </main>
  );
}
