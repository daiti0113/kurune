import { Category } from '@/libs/microcms';
import CategoryList from '@/components/CategoryList';
import styles from './index.module.css';

type Props = {
  categories: Category[];
};

export default function Nav({ categories }: Props) {
  return (
    <div className="pt-4 px-6 pb-6 mb-8 border-b-[1px]">
      <h1 className="text-md font-bold sm:text-center">人気カテゴリ</h1>
      <nav className="flex flex-col items-center justify-center gap-2">
        <CategoryList categories={categories} />
      </nav>
    </div>
  );
}
