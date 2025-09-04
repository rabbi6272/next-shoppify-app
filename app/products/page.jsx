"use client";
import { ProductCard } from "./productCard";

import { CategorySelector, useCategory } from "@/lib/hooks/useCategory";

export default function Products() {
  const { category, setCategory, products } = useCategory();

  return (
    <div className="h-auto w-full">
      <CategorySelector category={category} setCategory={setCategory} />

      {/* Product Grid */}
      <ul className="wrapper min-h-screen w-full px-2 pt-2 md:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {products?.map((product) => (
          <li key={product.id} className="card">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
