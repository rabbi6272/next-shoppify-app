import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";

import { Nunito } from "next/font/google";
import localFont from "next/font/local";

import { Sidebar } from "@/components/sidebar/Sidebar";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { AuthProvider } from "../lib/AuthProvider";
import { UserAvatar } from "@/components/sidebar/UserAvatar";
import { SmallNavigationDrawer } from "@/components/sidebar/smallNavbar";

export const metadata = {
  title: "Shoppify || shop anything anytime",
  description: "An unique and versitile platform for good quality shopping",
};

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

const ttTrailer = localFont({
  src: "./fonts/TT_Trailer/TT Trailers Trial ExtraBold Italic.ttf",
  display: "swap",
  weight: "800",
});

export default async function RootLayout({ children }) {
  return (
    <AuthProvider>
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
          <header className="header z-[5] w-full h-[70px] px-4 md:px-8 bg-inherit flex items-center justify-between text-black">
            <h1
              className={`${ttTrailer.className} -tracking-tight text-4xl font-bold text-buttonSecondary`}
            >
              Shoppify 🛒
            </h1>
            <div>
              <span className="block lg:hidden">
                <SmallNavigationDrawer />
              </span>
              <span className="hidden lg:block">
                <UserAvatar />
              </span>
            </div>
          </header>
          <section className="sidebar hidden lg:flex overflow-hidden">
            <Sidebar />
          </section>
          <main className="main overflow-y-auto overflow-x-hidden">
            {children}
            <Analytics />
            <SpeedInsights />
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
    </AuthProvider>
  );
}
