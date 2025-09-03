"use client";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

import { motion } from "motion/react";
import { useAuthStore } from "@/lib/hooks/useAuthStore";

export function UserAvatar({ photoUrl }) {
  const { user } = useAuthStore();
  if (!photoUrl) photoUrl = user?.photoURL;

  return (
    <Link href={`/profile`}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          scale: { type: "spring", visualDuration: 0.8, bounce: 0.1 },
        }}
      >
        {photoUrl ? (
          <div className="w-[50px] h-[50px] overflow-hidden rounded-full cursor-pointer">
            {photoUrl ? (
              <CldImage
                crop={"fill"}
                width={50}
                height={50}
                gravity="face"
                src={photoUrl}
                alt="user image"
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
      </motion.div>
    </Link>
  );
}
