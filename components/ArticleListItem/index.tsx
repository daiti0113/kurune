import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/libs/microcms';
import TagList from '../TagList';

type Props = {
  article: Article;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <div>
      <Link href={`/articles/${article.id}`} className="group relative flex h-48 mb-2 items-end justify-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-96">
        {article.image ? (
          <picture>
            <source
              type="image/webp"
              media="(max-width: 640px)"
              srcSet={`${article.image}?fm=webp&w=414 1x, ${article.image}?fm=webp&w=414&dpr=2 2x`}
            />
            <source
              type="image/webp"
              srcSet={`${article.image}?fm=webp&fit=crop&w=240&h=126 1x, ${article.image}?fm=webp&fit=crop&w=240&h=126&dpr=2 2x`}
            />
            <img
              src={article.image || `/noimage.png`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              width={article.thumbnail?.width}
              height={article.thumbnail?.height}
            />
          </picture>
        ) : (
          <Image
            className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            src="/no-image.png"
            alt="No Image"
            width={1200}
            height={630}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
        <span className="relative mr-3 mb-3 inline-block rounded-lg border border-gray-500 px-2 py-1 text-xs text-gray-200 font-semibold backdrop-blur-lg md:px-3 md:text-sm">10,000円</span>
      </Link>
      <dl>
          <dt className="text-md font-bold md:text-lg lg:text-xl">{article.title}</dt>
          <dd>
            <TagList tags={article.tags} hasLink={false} />
          </dd>
        </dl>
    </div>
  );
}
