"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import { motion } from "framer-motion";

import { CardPlacehoderSkeleton } from "../cardPlaceholder";
import { useProductStore } from "@/lib/store/store";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Page(params) {
  const { id } = params.params;

  const products = useProductStore((state) => state.products);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (products.length > 0) {
          const productFromCache = products.find((p) => p._id === id);
          console.log("product from cache", productFromCache);
          setData(productFromCache);
        }
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
            src={data?.image_url}
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
