"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation';

export const InstagramBanner = () => {
    const pathname = usePathname()

    if (pathname !== "/") return null

    return (
        <Link href="https://www.instagram.com/kurune.okinawa/?hl=ja" target="_blank" className="mx-4 md:mx-20">
            <div className="text-white py-8 md:py-12 px-4 w-full max-w-screen-xl self-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-md">
                <div className="flex flex-col items-center w-full">
                    <p className="text-xl sm:text-2xl md:text-3xl mb-2 font-bold">kurune 公式インスタグラム</p>
                    <p className="text-md sm:text-md md:text-xl mb-10 leading-none">新着商品を随時アップしています！📢</p>
                    <Link href="https://www.instagram.com/kurune.okinawa/?hl=ja" target="_blank" className="bg-white text-black font-bold uppercase text-sm md:text-base rounded hover:bg-gray-200 hover:text-gray-800 transition duration-100 px-8 py-2">
                        見てみる
                    </Link>
                </div>
            </div>
        </Link>
    )
}
