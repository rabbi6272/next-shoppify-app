"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Select, Option, Button } from "@material-tailwind/react";
import { FileInput } from "flowbite-react";
import { toast } from "react-toastify";

import { useProductStore } from "@/lib/store/store";

export default function AddProductPage() {
  const router = useRouter();

  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const [pending, setPending] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    category: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  async function handleAddProductFormSubmit(e) {
    e.preventDefault();

    const inputData = new FormData();
    inputData.append("name", formState.name);
    inputData.append("price", formState.price);
    inputData.append("category", formState.category);
    inputData.append("file", formState.file);

    if (
      !inputData.get("name") ||
      !inputData.get("price") ||
      !inputData.get("category")
    ) {
      return toast.error("Please fill up all the fields");
    }

    try {
      setPending(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/addProducts`,
        {
          method: "POST",
          body: inputData,
        }
      );
      const data = await response.json();
      if (data.success) {
        setPending(false);
        setProducts([]);
        toast.success(data.message);
        console.log("after setProducts", products);
        router.push("/products");
      } else {
        setPending(false);
        toast.error(data.message);
      }
    } catch (error) {
      setPending(false);
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="h-auto w-full pt-4 flex flex-col items-center justify-center">
      <form onSubmit={handleAddProductFormSubmit}>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-4 w-[95vw] md:w-[60vw] lg:w-[50vw] xl:w-[30vw]">
          <h3 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 text-center">
            Create Item
          </h3>
          <div className="p-4 space-y-4 ">
            <div>
              <div className="relative w-full min-w-[200px] h-11">
                <input
                  name="name"
                  required
                  placeholder="eg. White Shoes"
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                  value={formState.name}
                  onChange={handleChange}
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Name
                  <span className="inline-block text-red-500 ml-0.5">*</span>
                </label>
              </div>
            </div>

            <div>
              <div className="relative w-full min-w-[200px] h-11">
                <input
                  name="price"
                  required
                  placeholder="eg. 799$ | 1000$"
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                  value={formState.price}
                  onChange={handleChange}
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Price
                  <span className="inline-block text-red-500 ml-0.5">*</span>
                </label>
              </div>
            </div>

            <div className="w-full">
              <Select
                name="category"
                label="Select Category"
                required
                value={formState.category}
                onChange={(value) =>
                  setFormState((prev) => ({ ...prev, category: value }))
                }
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <Option value="Women's Clothing">Women&apos;s Clothing</Option>
                <Option value="Men's Clothing">Men&apos;s Clothing</Option>
                <Option value="Smartphones">Smartphones</Option>
                <Option value="Electronics">Electronics</Option>
                <Option value="Home Decoration">Home Decoration</Option>
                <Option value="Food">Food</Option>
              </Select>
            </div>

            <FileInput id="file-upload" onChange={handleChange} name="file" />
          </div>

          <div className="w-full p-4">
            <Button
              type="submit"
              disabled={pending}
              loading={pending}
              className="w-full rounded-full flex justify-center items-center"
            >
              {pending ? "Adding..." : "Add Product"}
            </Button>{" "}
          </div>
        </div>
      </form>
    </div>
  );
}
