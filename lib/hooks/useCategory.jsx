"use client";
import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";

// This is the actual custom hook
export function useCategory() {
  const [category, setCategory] = useState("All");
  return {
    category,
    setCategory,
  };
}

// This is a separate UI component that uses the hook
export function CategorySelector() {
  const { category, setCategory } = useCategory();
  const handleChange = (value) => {
    setCategory(value);
  };

  return (
    <div className="flex items-center w-[300px] gap-2 px-4 py-2">
      <p className="text-nowrap">Sort by:</p>
      <Select
        name="category"
        label="Select Category"
        className="flex-1 bg-white rounded-lg"
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
