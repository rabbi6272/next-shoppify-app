import Loader from "./Loader";
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

  return data ? (
    <div className="">
      <h1 className="text-xl lg:text-3xl font-semibold lg:font-bold text-center">
        All Products
      </h1>
      <h3 className="text-md lg:text-lg font-normal lg:font-bold text-center">
        Found {data.length} products
      </h3>
      <ul className="wrapper min-h-screen w-full px-2 pt-2 md:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {data.map((product) => (
          <li key={product._id} className="card">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <Loader />
  );
}
