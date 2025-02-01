"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

import useUserStore from "@/lib/store/store";

function UserComponent() {
  const user = useUserStore((state) => state.user);
  return (
    <>
      {user ? (
        <div>
          <Link href="/admin/profile">
            <div className="w-[50px] h-[50px] overflow-hidden rounded-full cursor-pointer">
              {user.image_url ? (
                <Image
                  cover
                  width={50}
                  height={50}
                  alt="user image"
                  src={user.image_url}
                />
              ) : (
                <svg
                  className="h-[50px] w-[50px] rounded-full p-1 bg-gray-300 text-gray-400 "
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
        </div>
      ) : (
        <Link href="/admin/admin-login">
          <svg
            className="h-[50px] w-[50px] rounded-full p-1 bg-gray-300 text-gray-400 "
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
        </Link>
      )}
    </>
  );
}

export function UserAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        scale: { type: "spring", visualDuration: 0.8, bounce: 0.5 },
      }}
    >
      <UserComponent />
    </motion.div>
  );
}

{
  /* <div className="flex items-center gap-8">
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
      </div> */
}

// <div
//   id="userDropdown"
//   className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
// >
//   <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
//     <div>{user.name}</div>
//   </div>
//   <div className="py-1">
//     <Link
//       href="#"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//     >
//       Sign out
//     </Link>
//   </div>
// </div>
