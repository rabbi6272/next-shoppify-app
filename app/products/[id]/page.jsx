"use client";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import { CardPlacehoderSkeleton } from "../cardPlaceholder";

import { getProductsFromCache } from "@/utils/cache";
import { getProductById } from "@/utils/dataLayes";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Page(params) {
  const { id } = params.params;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cachedProducts = await getProductsFromCache();
        if (cachedProducts) {
          const productFromCache = cachedProducts.find((p) => p._id === id);
          if (productFromCache) {
            setProduct(productFromCache);
          } else {
            const res = await getProductById(id);
            setProduct(res);
          }
        } else {
          const res = await getProductById(id);
          setProduct(res);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (!product) {
    return <div className="text-center text-lg p-10 ">Product not found</div>;
  }

  return (
    <div className="w-full max-h-screen">
      {isLoading ? (
        <CardPlacehoderSkeleton />
      ) : (
        <div className="p-4 w-[90%] md:w-[350px] h-auto m-auto bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
          <Image
            width={300}
            height={300}
            style={{ width: "100%", height: "auto" }}
            src={product?.image_url}
            alt={product?.name}
            className="rounded-lg object-cover"
          />
          <h2 className={`${inter.className} text-lg font-normal py-1`}>
            {product?.name}
          </h2>
          <p>{product?.description}</p>
          <h2 className={`${inter.className} text-2xl`}>{product?.price}$</h2>
        </div>
      )}
    </div>
  );
}
