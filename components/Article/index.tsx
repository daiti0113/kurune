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
      <h1 className={styles.title}>{data.title}</h1>
      <TagList tags={data.tags} />
      <p className={styles.description}>{data.description}</p>
      <div className={styles.meta}>
        {data.seller && (
          <div className={styles.seller}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${data.seller?.image?.url}?fm=webp&fit=crop&w=48&h=48 1x, ${data.seller?.image?.url}?fm=webp&fit=crop&w=48&h=48&dpr=2 2x`}
              />
              <img
                src={data.seller?.image?.url}
                alt=""
                className={styles.sellerIcon}
                width={data.seller?.image?.width}
                height={data.seller?.image?.height}
              />
            </picture>
            <span className={styles.sellerName}>{data.seller?.name}</span>
          </div>
        )}
        <PublishedDate date={data.publishedAt || data.createdAt} />
      </div>
      <picture>
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
          width={data.thumbnail?.width}
          height={data.thumbnail?.height}
        />
      </picture>
      <CommentForm item={data} />
    </main>
  );
}
