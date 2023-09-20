"use client"

import { useWindowSize } from '@/hooks/window';
import Image from 'next/image';
import Link from 'next/link';
import SearchField from '../SearchField';

export default function Header() {
  const { width } = useWindowSize()
  return width > 960 ? <PcHeader /> : <MobileHeader />;
}

const PcHeader = () => {
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
  )
}

const MobileHeader = () => {
  return (
    <header className="">
      <Link href="/" className="flex justify-center">
        <Image
          src="/logo.png"
          alt="SIMPLE"
          width={200}
          height={80}
          priority
        />
      </Link>
      <div className="my-4 px-10 flex justify-center">
        <SearchField />
      </div>
    </header>
  )
}