import { Category } from '@/libs/microcms';
import CategoryList from '@/components/CategoryList';
import styles from './index.module.css';

type Props = {
  categories: Category[];
};

export default function Nav({ categories }: Props) {
  return (
    <nav className="flex flex-col items-center justify-center gap-2 px-6 pb-6 mb-8 border-b-[1px]">
      <CategoryList categories={categories} />
    </nav>
  );
}
