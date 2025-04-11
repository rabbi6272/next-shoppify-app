import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import ProductItem from "@/model/ProductSchema.model";
import { connectDB } from "@/lib/DB/connectDB";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
async function page(params) {
  const { id } = params.params;
  await connectDB();
  const product = await ProductItem.findOne({ _id: id }).lean();

  if (!product) {
    return <div className="text-center p-10">Product not found</div>;
  }

  return (
    <div className="w-full max-h-screen">
      <div className="p-4 w-[90%] lg:w-[400px] h-[80%] lg:h-[60%] m-auto bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
        <Image
          width={300}
          height={300}
          src={product.image_url}
          alt={product.name}
          className="rounded-lg object-cover"
        />
        <h2 className={`${inter.className} text-lg font-normal py-1`}>
          {product.name}
        </h2>
        <p>{product.description}</p>
        <h2 className={`${inter.className} text-2xl`}>{product.price}$</h2>
      </div>
    </div>
  );
}

export default page;
