import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acoboo",
  description: "Acoboo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <nav className="flex bg-gray-800 p-4 text-white">
          <Link href="/" className="border p-1 mx-2">
            入出金
          </Link>
          <Link href="accounts" className="border p-1 mx-2">
            口座
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
