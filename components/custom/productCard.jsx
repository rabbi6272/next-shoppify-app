import Image from "next/image";
import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="w-full h-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:drop-shadow-lg">
      <div className="relative h-[250px] md:h-[300px] w-full">
        <Image
          fill
          sizes="100%"
          src={product.image_url}
          alt="product image"
          className=" rounded-t-lg h-full w-full"
        />
      </div>
      <div className="px-3 pb-5">
        <h5 className="py-2 text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.name}{" "}
        </h5>
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
            {product.price}$
          </span>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-3 md:px-5 py-2 md:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
