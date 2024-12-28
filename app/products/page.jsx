import { Suspense } from "react";
import Cardv2 from "@/components/custom/cardv2";

export default async function Products() {
  const { data } = await fetch(
    `${process.env.BASE_URL}/api/products/getProducts`,
    {
      method: "GET",
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-600">Loading...</h1>
        </div>
      }
    >
      <div>
        <ul className="min-h-screen w-full px-2 pt-2 md:px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {data?.map((product) => (
            <li key={product._id}>
              <Cardv2 product={product} />
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}
