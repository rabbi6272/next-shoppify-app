import Link from "next/link";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { Navbar } from "@/components/custom/Navbar";
import { SmallNavigationDrawer } from "@/components/custom/smallNavbar";
import { Toaster } from "react-hot-toast";
import { Slide, ToastContainer } from "react-toastify";

export const metadata = {
  title: "Shopping Cart || shop anything anytime",
  description: "An unique and versitile platform for good quality shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="true"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
        />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          theme="light"
          transition={Slide}
        />
        <header className="sticky top-0 z-10 w-full h-20 px-4 bg-inherit flex items-center justify-between ">
          <Link href="/">
            <h1 className="text-3xl font-bold ">Shopping Cart</h1>
          </Link>
          <div>
            <span className="block md:hidden">
              <SmallNavigationDrawer />
            </span>
            <span className="hidden md:block">
              <Navbar />
            </span>
          </div>
        </header>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
