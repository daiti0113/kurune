import { getCategory } from '@/libs/microcms';
import CategoryListItem from '@/components/CategoryListItem';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
  params: {
    categoryId: string;
  };
};

export default async function CategoriesLayout({ children, params }: Props) {
  const { categoryId } = params;
  const category = await getCategory(categoryId);
  return (
    <div>
      <p className={styles.title}>
        <CategoryListItem category={category} hasLink={false} />
        の記事一覧
      </p>
      <div>{children}</div>
    </div>
  );
}
