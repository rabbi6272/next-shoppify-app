"use client";
import { useState, useEffect } from "react";

import { Select, Option } from "@material-tailwind/react";
import { motion } from "framer-motion";

import { useProductStore } from "@/lib/store/store";

import { ProductCard } from "./productCard";
import { CardPlacehoderSkeleton } from "./cardPlaceholder";

export default function Products() {
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const [category, setCategory] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (products.length > 0) {
          setData(products);
        } else {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/getProducts`,
            { method: "GET" }
          );
          const { data } = await res.json();
          setProducts(data);
          setData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setData, setProducts]);

  console.log("products", products);

  const filteredData = data.filter((product) => {
    if (category === "All" || category === null) {
      return true;
    }
    return product.category === category;
  });

  return (
    <div>
      {isLoading ? (
        <div className="h-auto w-full grid place-items-center">
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

          <motion.ul
            className="wrapper min-h-screen w-full px-2 pt-2 md:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {filteredData?.map((product) => (
              <li key={product._id} className="card">
                <ProductCard product={product} />
              </li>
            ))}
          </motion.ul>
        </div>
      )}
    </div>
  );
}
