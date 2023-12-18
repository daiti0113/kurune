'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/libs/microcms';
import CategoryList from '../CategoryList';

type Props = {
  article: Article;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <div className="relative">
      {article.sold && <Ribbon label="SOLD OUT" />}
      <Link
        href={`/articles/${article.id}`}
        className="group relative flex h-48 mb-2 items-end justify-end overflow-hidden rounded-lg bg-gray-100 shadow-lg shadow-neutral-400 md:h-96"
      >
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
            {/.(avi|mp4|mov|wmv|flv|mpg|quicktime)$/i.test(article.image) ? (
              <video
                controlsList="nofullscreen"
                muted
                src={`${article.image}#t=0.001,5`}
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            ) : (
              <Image
                src={article.image}
                alt={article.title}
                width="1080"
                height="810"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            )}
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
        <span className="relative mr-3 mb-3 inline-block rounded-lg border border-gray-500 px-2 py-1 text-sm text-gray-200 font-semibold backdrop-blur-lg md:px-3 md:text-md">
          ¥{article.price.toLocaleString()}
        </span>
      </Link>
      <dl>
        <dt className="text-md font-bold md:text-lg lg:text-xl">{article.title}</dt>
        <dd>
          <div className="flex gap-2 mt-1">
            {article.cities.map((cityName) => (
              <span key={cityName} className="text-sm">
                {cityName}
              </span>
            ))}
          </div>
          <CategoryList categories={article.categories} hasLink={false} />
        </dd>
      </dl>
    </div>
  );
}

const Ribbon = ({label}: {label: string}) => {
  return (
    <div
      className={`
        w-[100px] h-[100px] overflow-hidden absolute
        top-[-10px] left-[-10px] z-10
        before:absolute before:z-0 before:content-[''] before:block before:border-t-[5px] before:border-r-[5px] before:border-b-[5px] before:border-l-[5px] before:border-warn-900 before:border-t-transparent before:border-l-transparent before:top-0 before:right-0
        after:absolute after:z-0 after:content-[''] after:block after:border-t-[5px] after:border-r-[5px] after:border-b-[5px] after:border-l-[5px] after:border-warn-900 after:border-t-transparent after:border-l-transparent after:left-0 after:bottom-0
      `}
    >
      <span className="absolute block text-sm w-[230px] py-[5px] bg-warn-500 shadow-md text-white text-center right-[-55px] top-[25px] -rotate-45">
        {label}
      </span>
    </div>
  );
};
