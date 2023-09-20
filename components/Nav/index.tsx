import { Tag } from '@/libs/microcms';
import TagList from '@/components/TagList';
import styles from './index.module.css';

type Props = {
  tags: Tag[];
};

export default function Nav({ tags }: Props) {
  return (
    <nav className="flex flex-col items-center justify-center gap-2 px-6 pb-6 mb-8 border-b-[1px]">
      <TagList tags={tags} />
    </nav>
  );
}
