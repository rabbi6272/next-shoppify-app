import Link from "next/link";
import "./globals.css";
import { Nunito } from "next/font/google";
import { SmallNavigationDrawer } from "@/components/custom/smallNavbar";
import { Slide, ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { UserDataFetcher } from "@/components/custom/DataFetcher";
import { MobileNavbar } from "@/components/custom/MobileNavbar";
import Sidebar from "@/components/custom/Sidebar";

export const metadata = {
  title: "Shopping Cart || shop anything anytime",
  description: "An unique and versitile platform for good quality shopping",
};

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="true"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${nunito.className} h-screen`}>
        <UserDataFetcher />
        <header className="header z-10 w-full h-[70px] px-4 md:px-8 bg-inherit flex items-center justify-between text-black">
          <Link href="/">
            <h1 className="text-3xl font-bold ">Shopping Cart</h1>
          </Link>
          <div>
            <span className="block lg:hidden">
              <SmallNavigationDrawer />
            </span>
            {/* <span className="hidden md:block">
              <Navbar />
            </span> */}
          </div>
        </header>
        <section className="sidebar hidden lg:flex overflow-hidden">
          <Sidebar />
        </section>
        <main className="main min-h-screen overflow-y-auto bg-blue-gray-50">
          {children}
          <Analytics />
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          theme="light"
          transition={Slide}
        />
      </body>
    </html>
  );
}
