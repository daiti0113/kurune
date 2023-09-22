import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSDate,
  MicroCMSContentId,
} from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

// タグの型定義
export type Tag = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

// 商品の型定義
export type Item = {
  name: string
  price: number
  email: string
  tel: string
  title: string;
  description: string;
  tags?: Tag[];
  image?: string;
};

export type Comment = {
  name: string
  email: string
  tel: string
  comment: string
}

export type Article = Item & MicroCMSContentId & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// 商品一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Item>({
      endpoint: 'items',
      queries,
    })
    .catch(notFound);
  return listData;
};

// 商品の詳細を取得
export const getDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client
    .getListDetail<Item>({
      endpoint: 'items',
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};

// タグの一覧を取得
export const getTagList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Tag>({
      endpoint: 'tags',
      queries,
    })
    .catch(notFound);

  return listData;
};

// タグの詳細を取得
export const getTag = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client
    .getListDetail<Tag>({
      endpoint: 'tags',
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};

export type PostItemPayload = Omit<Item, "tags" | "seller"> & {
  tags: string[]
}

export const postItem = async (data: PostItemPayload) => {
  const detailData = await client
    .create({
      endpoint: 'items',
      content: data
    })
  return detailData;
};

export type PostCommentPayload = Comment

export const postComment = async (data: PostCommentPayload) => {
  const detailData = await client
    .create({
      endpoint: 'comments',
      content: data
    })
  return detailData;
};
