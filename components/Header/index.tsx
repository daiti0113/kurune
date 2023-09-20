import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="SIMPLE"
          width={200}
          height={80}
          priority
        />
      </Link>
    </header>
  );
}
