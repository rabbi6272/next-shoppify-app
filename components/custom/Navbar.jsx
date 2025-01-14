"use client";
import Link from "next/link";
import useUserStore from "@/lib/store/store";
import { useEffect } from "react";
import Image from "next/image";

export function Navbar() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) return;
    async function fetchUser() {
      const res = await fetch(`/api/admin/getAdmin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const { user } = await res.json();
      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <nav className="flex gap-16">
      <div className="flex items-center gap-8">
        <Link
          className="px-6 py-2 rounded-full hover:bg-gray-200 hover:drop-shadow-xl "
          href="/"
        >
          Home
        </Link>
        <Link
          className="px-6 py-2 rounded-full  hover:bg-gray-200 hover:drop-shadow-xl "
          href="/about"
        >
          About
        </Link>
        {user ? (
          <Link
            className="px-6 py-2 rounded-full  hover:bg-gray-200 hover:drop-shadow-xl "
            href="/admin"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            className="px-6 py-2 rounded-full  hover:bg-gray-200 hover:drop-shadow-xl "
            href="/admin/admin-login"
          >
            Login
          </Link>
        )}
      </div>
      {user && (
        <div>
          <Link href="/admin/profile">
            <div
              id="avatarButton"
              type="button"
              data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-start"
              className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
              alt="User dropdown"
            >
              {user.image_url ? (
                <Image
                  fill
                  sizes="100%"
                  alt="user image"
                  className="w-full h-full object-cover ring-1 ring-gray-300 dark:ring-gray-500"
                  src={user.image_url}
                />
              ) : (
                <svg
                  className="absolute size-full text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
          </Link>

          <div
            id="userDropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{user.name}</div>
            </div>
            <div className="py-1">
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
