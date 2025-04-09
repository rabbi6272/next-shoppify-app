import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import ProductItem from "@/model/ProductSchema.model";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
async function page(params) {
  const { id } = params.params;
  const product = await ProductItem.findById(id);

  return (
    <div className=" max-h-screen">
      <div className="p-4 w-[90%] lg:w-[40%] h-[80%] lg:h-[60%] m-auto bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
        <Image
          width={300}
          height={300}
          src={product.image_url}
          alt={product.name}
          className=" rounded-lg  object-cover"
        />
        <h3 className={`${inter.className} text-2xl font-normal py-1`}>
          {product.name}
        </h3>
        <p>{product.price}$</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default page;
