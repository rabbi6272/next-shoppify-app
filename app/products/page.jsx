import ProductCard from "./productCard";

export default async function Products() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/getProducts`,
    { method: "GET" }
  );
  const { data } = await res.json();

  return (
    <div className="">
      <div className="w-full px-2">
        <label htmlFor="sort">Sort:</label>
        <select
          name="sort"
          id="sort"
          className="w-[150px]  rounded-md border-2 border-blue-gray-300 focus:outline-none"
        >
          <option value="smartphones">Smartphones</option>
          <option value="electronics">Electronics</option>
          <option value="food">Food</option>
        </select>
      </div>

      <ul className="wrapper min-h-screen w-full px-2 pt-2 md:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {data.map((product) => (
          <li key={product._id} className="card">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
