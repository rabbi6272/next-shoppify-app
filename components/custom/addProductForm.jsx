"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export function useAddProduct() {
  const { pending } = useFormStatus();
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  console.log("formState", formState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormState((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSelectChange = (value) => {
    setFormState((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const resetForm = () => {
    setFormState({
      name: "",
      price: "",
      category: "",
      description: "",
      image: null,
    });
  };

  return {
    formState,
    pending,
    handleInputChange,
    handleFileChange,
    handleSelectChange,
    resetForm,
  };
}
