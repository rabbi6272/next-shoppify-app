import Link from "next/link";
import "./globals.css";
import { Provider } from "@/components/ui/provider";

export const metadata = {
  title: "Shopping Cart || shop anything anytime",
  description: "An unique and versitile platform for good quality shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <header className="sticky top-0 z-10 w-full h-20 px-4 bg-inherit flex items-center justify-between ">
          <Link href="/">
            <h1 className="text-3xl font-bold ">Shopping Cart</h1>
          </Link>
          <nav className="flex items-center justify-center gap-8">
            <Link
              className="px-6 py-2 rounded-full  hover:bg-neutral-800 hover:drop-shadow-xl "
              href="/"
            >
              Home
            </Link>
            <Link
              className="px-6 py-2 rounded-full  hover:bg-neutral-800 hover:drop-shadow-xl "
              href="/about"
            >
              About
            </Link>
            <Link
              className="px-6 py-2 rounded-full  hover:bg-neutral-800 hover:drop-shadow-xl "
              href="/products"
            >
              Products
            </Link>
            <Link
              className="px-6 py-2 rounded-full  hover:bg-neutral-800 hover:drop-shadow-xl "
              href="/admin-login"
            >
              Login
            </Link>
          </nav>
        </header>
        <Provider>{children}</Provider>
        {/* {children} */}
      </body>
    </html>
  );
}
