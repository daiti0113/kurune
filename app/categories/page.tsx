import { getCategoryList } from '@/libs/microcms';
import CategoryList from '@/components/CategoryList';

export const metadata = {
  title: 'kurune | カテゴリ一覧',
};

export default async function Categories() {
  const categories = await getCategoryList({
    limit: 100,
  });
  return (
    <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold">カテゴリ一覧</h1>
        <CategoryList categories={categories.contents} />
    </div>
  );
}
