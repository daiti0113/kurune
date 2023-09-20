import Image from 'next/image';
import Link from 'next/link';
import SearchField from '../SearchField';

export default function Header() {
  return (
    <header className="px-6 flex items-center">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="SIMPLE"
          width={200}
          height={80}
          priority
        />
      </Link>
      <div className="ml-8">
        <SearchField />
      </div>
    </header>
  );
}
