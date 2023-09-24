"use client"

import { CONTACT_URL } from '@/constants';
import { useWindowSize } from '@/hooks/window';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SearchField from '../SearchField';

export default function Header() {
  const { width } = useWindowSize()
  return width > 960 ? <PcHeader /> : <MobileHeader />;
}

const PcHeader = () => {
  return (
    <header>
      <div className="bg-primary-500 text-white text-xs md:text-sm py-2 px-6">
      【会員登録不要】沖縄県内限定｜手渡しのみのフリマサイト
      </div>
      <div className="px-6 mt-2 flex items-center">
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
        <nav className="ml-auto md:flex gap-8 mr-6">
          <Link href="/" className="text-sm hover:text-gray-500 transition duration-100">ホーム</Link>
          <Link href="/categories" className="text-sm hover:text-gray-500 transition duration-100">カテゴリ一覧</Link>
          <Link href="/register" className="text-sm hover:text-gray-500 transition duration-100">出品する</Link>
          <Link href={CONTACT_URL} target="_blank" className="text-sm hover:text-gray-500 transition duration-100">管理者へのお問い合わせ</Link>
        </nav>
      </div>
    </header>
  )
}

const MobileHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false)
  return (
    <header>
      <div className="bg-primary-500 text-white text-xs md:text-sm py-2 px-6">
        【会員登録不要】沖縄県内限定｜手渡しのみのフリマサイト
      </div>
      <div className="flex mt-2">
        <div className="flex-1" />
        <Link href="/" className="flex justify-center flex-auto">
          <Image
            src="/logo.png"
            alt="SIMPLE"
            width={200}
            height={80}
            priority
          />
        </Link>
        <button type="button" onClick={() => setMenuVisible(!menuVisible)} className="flex-1 text-black inline-flex items-center justify-end focus-visible:ring ring-indigo-300 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 mr-4 md:mr-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
        </button>
        {menuVisible && (
            <div id="dropdownNavbar" className="absolute top-20 right-10 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <li>
                        <Link href="/" className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black`}>ホーム</Link>
                    </li>
                    <li>
                        <Link href="/categories" className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black`}>カテゴリ一覧</Link>
                    </li>
                    <li>
                        <Link href="/register" className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black`}>出品する</Link>
                    </li>
                    <li>
                        <Link href={CONTACT_URL} target="_blank" className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black`}>管理者へのお問い合わせ</Link>
                    </li>
                </ul>
            </div>
        )}
      </div>
      <div className="my-4 px-10 flex justify-center">
        <SearchField />
      </div>
    </header>
  )
}