"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });

import { useAuthStore } from "@/lib/hooks/useAuthStore";

export function Sidebar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  return (
    <ul
      className={`${inter.className} font-medium w-full flex flex-col justify-between pb-4`}
    >
      <div className="space-y-2">
        <li>
          <Link
            href="/"
            className="flex items-center p-2 pl-4 rounded-full group text-gray-600 hover:text-gray-800 hover:bg-gray-300"
          >
            <i className="fa-solid fa-house fa-md shrink-0 transition duration-200"></i>
            <span className="flex-1 ms-2 whitespace-nowrap text-md">Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="flex items-center p-2 pl-4 rounded-full group text-gray-600 hover:text-gray-800 hover:bg-gray-300"
          >
            <i className="fa-solid fa-circle-info fa-md shrink-0 transition duration-200"></i>
            <span className="flex-1 ms-2 whitespace-nowrap text-md">About</span>
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="flex items-center p-2 pl-4 rounded-full group text-gray-600 hover:text-gray-800 hover:bg-gray-300"
          >
            <i className="fa-solid fa-cart-shopping fa-md shrink-0 transition duration-200"></i>
            <span className="flex-1 ms-2 whitespace-nowrap text-md">
              Products
            </span>
          </Link>
        </li>
        {user?.role === "admin" && (
          <li>
            <Link
              href="/admin/dashboard"
              className="flex items-center p-2 pl-4 text-gray-700 hover:text-gray-800 rounded-full dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
            >
              <svg
                className="shrink-0 w-4 h-4 text-gray-500 transition duration-200 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-2">Dashboard</span>
            </Link>
          </li>
        )}
        {!user && (
          <li>
            <Link
              href="/auth/login"
              className="flex items-center p-2 pl-4 rounded-full group text-gray-600 hover:text-gray-800 hover:bg-gray-300"
            >
              <i className="fa-solid fa-right-to-bracket fa-md shrink-0 transition duration-200"></i>
              <span className="flex-1 ms-2 whitespace-nowrap text-md">
                Log in
              </span>
            </Link>
          </li>
        )}
      </div>

      {user && (
        <div
          onClick={async () => {
            await logout();
            router.push("/auth/login");
          }}
          className="flex items-center p-2 pl-4 rounded-full group text-gray-600 hover:text-gray-800 hover:bg-gray-300 cursor-pointer"
        >
          <i className="fa-solid fa-right-from-bracket fa-md shrink-0 transition duration-200"></i>
          <span className="flex-1 ms-2 whitespace-nowrap text-md">Log out</span>
        </div>
      )}
    </ul>
  );
}
