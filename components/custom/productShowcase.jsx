import ProductCard from "./productCard";

export default async function ProductShowcase() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/getProducts`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const { data } = await res.json();

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center">All Products</h1>
      <h3 className="text-lg font-bold text-center">
        Found {data?.length} products
      </h3>
      <ul className="min-h-screen w-full px-2 pt-2 md:px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {data?.map((product) => (
          <li key={product._id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
