"use client";
import { useFormState } from "react-dom";
import { useEffect } from "react";

import AdminLoginForm from "@/components/custom/AdminLoginForm";
import { handleAdminSubmit } from "@/app/admin/admin-login/adminFormHandler";

import { Toaster, toaster } from "@/components/ui/toaster";

export default function AdminLogin() {
  const [state, formAction] = useFormState(handleAdminSubmit, null);

  useEffect(() => {
    console.log(state);
    if (state && state.success) {
      toaster.create({
        title: "Login Successfull",
        description: "Admin logged in successfully",
        position: "top",
        type: "success",
        duration: 2000,
      });
      setTimeout(() => (window.location.href = "/admin"), 1500);
    } else if (state) {
      toaster.create({
        title: "Login Failed",
        description: state.message,
        position: "top",
        type: "error",
        duration: 2000,
      });
    }
  }, [state]);

  return (
    <div className="bg-inherit h-auto w-full pt-4 flex justify-center items-center">
      <Toaster />
      <form
        action={formAction}
        className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <AdminLoginForm />
      </form>
    </div>
  );
}
