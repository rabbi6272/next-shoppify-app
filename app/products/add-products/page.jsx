"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { Toaster, toaster } from "@/components/ui/toaster";
import AddProductFormV2 from "@/components/custom/addProductForm";
import { productFormHandler } from "@/app/products/add-products/productFormHandler";

export default function page() {
  const [state, formAction] = useFormState(productFormHandler, null);

  useEffect(() => {
    console.log(state);
    if (state && state.status === 201) {
      toaster.create({
        title: "Upload Successfull",
        description: "Product saved to database successfully",
        position: "top",
        type: "success",
        duration: 2000,
      });
      setTimeout(() => (window.location.href = "/products"), 1500);
    } else if (state) {
      toaster.create({
        title: "Upload Failed",
        description: state.message,
        position: "top",
        type: "error",
        duration: 2000,
      });
    }
  }, [state]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <Toaster />

      <form action={formAction}>
        <AddProductFormV2 />
      </form>
    </div>
  );
}
