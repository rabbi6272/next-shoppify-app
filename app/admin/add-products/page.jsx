"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";

import { redirect } from "next/navigation";
import { Select, Option, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function AddProductPage() {
  const { pending } = useFormStatus();
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    category: "",
    image_url: "",
    image_id: "",
  });

  async function handleImageUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/addProducts/uploadImage`,
      {
        method: "POST",
        body: formData,
      }
    );
    const { data } = await response.json();
    setFormState((prev) => ({
      ...prev,
      image_url: data.secure_url,
      image_id: data.public_id,
    }));
  }

  async function handleAddProductFormSubmit(e) {
    e.preventDefault();
    const formData = formState;

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.image
    ) {
      return toast.error("Please fill up all the fields");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/addProducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setFormState({
          name: "",
          price: "",
          category: "",
          image: "",
        });
        redirect("/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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
                  required
                  placeholder="eg. White Shoes"
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                  name="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
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
                  required=""
                  placeholder="eg. 799$ | 1000$"
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                  name="price"
                  value={formState.price}
                  onChange={(e) =>
                    setFormState({ ...formState, price: e.target.value })
                  }
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Price
                  <span className="inline-block text-red-500 ml-0.5">*</span>
                </label>
              </div>
            </div>

            <div className="w-full">
              <Select
                label="Select Category"
                name="category"
                required={true}
                value={formState.category}
                onChange={(value) =>
                  setFormState({ ...formState, category: value })
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
                <Option value="Furniture">Furniture</Option>
              </Select>
            </div>

            <div>
              <p className="block antialiased font-sans text-sm font-light leading-normal text-blue-gray-900">
                Image
                <span className="inline-block text-red-500 ml-0.5">*</span>
              </p>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  required
                  className="w-full rounded-md border border-blue-gray-200"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
          <div className="w-full p-4">
            <Button
              type="submit"
              disabled={pending}
              loading={pending}
              className="w-full rounded-full flex justify-center items-center"
              onClick={handleAddProductFormSubmit}
            >
              {pending ? "Adding..." : "Add Product"}
            </Button>{" "}
          </div>
        </div>
      </form>
    </div>
  );
}
