import { Suspense } from "react";

import ShopingItem from "@/lib/DB/productSchema.model";
import Cardv2 from "@/components/custom/cardv2";

export default async function Products() {
  const products = await ShopingItem.find({});

  // Convert products to plain objects
  const plainProducts = products.map((product) =>
    JSON.parse(JSON.stringify(product))
  );

  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-600">Loading...</h1>
        </div>
      }
    >
      <div>
        <ul className="min-h-screen w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {plainProducts.map((product) => (
            <li key={product._id}>
              {/* <ProductCard product={product} /> */}
              <Cardv2 product={product} />
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}
