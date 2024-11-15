"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@material-tailwind/react";

export default function AddProductFormButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      loading={pending}
      className="w-full rounded-full flex justify-center items-center"
    >
      {pending ? "Adding..." : "Add Product"}
    </Button>
  );
}
