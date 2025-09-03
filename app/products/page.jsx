import { Suspense } from "react";

import { ProductCard } from "./productCard";
import { CardPlacehoderSkeleton } from "./cardPlaceholder";

import { CategorySelector, useCategory } from "../../lib/hooks/useCategory";

export default async function Products() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/getProducts`,
    { method: "GET", cache: "no-store" }
  );
  const { data: data } = await res.json();

  return (
    <Suspense
      fallback={
        <div className="h-auto w-full grid place-items-center">
          <CardPlacehoderSkeleton />
        </div>
      }
    >
      {/* <CategorySelector /> */}
      <div className="h-auto w-full">
        <ul className="wrapper min-h-screen w-full px-2 pt-2 md:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {data?.map((product) => (
            <li key={product._id} className="card">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}
