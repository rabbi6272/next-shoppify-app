"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import { motion } from "framer-motion";

import { CardPlacehoderSkeleton } from "../cardPlaceholder";
import { getDocumentById } from "@/lib/firebase/firebaseUtils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Page(params) {
  const { id } = params.params;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        getDocumentById("products", id).then((doc) => {
          if (doc) {
            setData(doc);
          } else {
            setData(null);
          }
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return (
      <div className="text-center text-lg p-10 font-semibold">
        Product not found
      </div>
    );
  }

  return (
    <div className="w-full max-h-screen">
      {isLoading ? (
        <div className="h-auto w-full grid place-items-center">
          <CardPlacehoderSkeleton />
        </div>
      ) : (
        <motion.div
          className="p-4 w-[80%] md:w-[350px] h-auto m-auto bg-white rounded-lg shadow-lg flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            width={300}
            height={300}
            style={{ height: "auto" }}
            src={data?.imageUrl}
            alt={data?.name}
            className="rounded-lg object-cover"
          />
          <h2 className={`${inter.className} text-lg font-normal py-1`}>
            {data?.name}
          </h2>
          <p>{data?.description}</p>
          <h2
            className={`${inter.className} text-2xl font-semibold text-[#4CAF50]`}
          >
            {data?.price}$
          </h2>
        </motion.div>
      )}
    </div>
  );
}
