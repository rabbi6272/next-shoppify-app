"use client";
import { useState, useEffect } from "react";

import { getProductsByCategory } from "@/lib/firebase/firebaseUtils";

import { Option, Select } from "@material-tailwind/react";

// This is the actual custom hook
export function useCategory() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProductsByCategory(category);
      setProducts(data);
    }
    fetchProducts();
  }, [category]);

  return {
    category,
    setCategory,
    products,
    setProducts,
  };
}

// This is a separate UI component that uses the hook
export function CategorySelector({ category, setCategory }) {
  const handleChange = (value) => {
    setCategory(value);
  };

  return (
    <div className="flex items-center  gap-2 px-4 py-2">
      <p className="text-nowrap shrink-0">Sort by:</p>
      <Select
        name="category"
        label="Select Category"
        className="bg-white rounded-lg"
        value={category}
        onChange={handleChange}
      >
        <Option value="All">All</Option>
        <Option value="Food">Food</Option>
        <Option value="Women's Clothing">Women&apos;s Clothing</Option>
        <Option value="Men's Clothing">Men&apos;s Clothing</Option>
        <Option value="Smartphones">Smartphones</Option>
        <Option value="Electronics">Electronics</Option>
      </Select>
    </div>
  );
}
