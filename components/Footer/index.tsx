import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col py-4 px-6 justify-center items-center text-sm gap-3 sm:flex-row">
      <Link className="text-primary-500" href={"/privacy"}>プライバシーポリシー</Link>
      <Link className="text-primary-500" href={"/tos"}>利用規約</Link>
      <p>© Omochi. All Rights Reserved 2023</p>
    </footer>
  );
}
