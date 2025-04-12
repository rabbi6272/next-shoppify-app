"use client";
import { useState, useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";
import { ProductCard } from "./productCard";
import { CardPlacehoderSkeleton } from "./cardPlaceholder";

export default function Products() {
  const [category, setCategory] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/getProducts`,
          { method: "GET" }
        );
        const { data } = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setData]);

  const filteredData = data.filter((product) => {
    if (category === "All" || category === null) {
      return true;
    }
    return product.category === category;
  });

  return (
    <div>
      {isLoading ? (
        <div className="h-full w-full m-auto">
          <CardPlacehoderSkeleton />
        </div>
      ) : (
        <div className="h-auto w-full">
          <div className="flex items-center w-[300px] gap-2 px-4 py-2">
            <p className="text-nowrap ">Sort by:</p>
            <Select
              name="category"
              label="Select Category"
              className="flex-1 bg-white rounded-lg"
              value={category}
              onChange={(e) => setCategory(e)}
            >
              <Option value="All">All</Option>
              <Option value="Food">Food</Option>
              <Option value="Women's Clothing">Women&apos;s Clothing</Option>
              <Option value="Men's Clothing">Men&apos;s Clothing</Option>
              <Option value="Smartphones">Smartphones</Option>
              <Option value="Electronics">Electronics</Option>
            </Select>
          </div>

          <ul className="wrapper min-h-screen w-full px-2 pt-2 md:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
            {filteredData?.map((product) => (
              <li key={product._id} className="card">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

{
  /* 
        <div className="flex items-center w-[300px] gap-2 px-4 py-2">
          <p className="text-nowrap ">Sort by:</p>
          <Select
            name="category"
            label="Select Category"
            className="flex-1 bg-white rounded-lg"
            value={category}
            onChange={(e) => setCategory(e)}
          >
            <Option value="All">All</Option>
            <Option value="Food">Food</Option>
            <Option value="Women's Clothing">Women&apos;s Clothing</Option>
            <Option value="Men's Clothing">Men&apos;s Clothing</Option>
            <Option value="Smartphones">Smartphones</Option>
            <Option value="Electronics">Electronics</Option>
            <Option value="Home Decoration">Home Decoration</Option>
          </Select>
          </div> */
}
