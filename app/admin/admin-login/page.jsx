"use client";
import { useFormState } from "react-dom";
import { useEffect } from "react";

import AdminLoginForm from "@/components/custom/AdminLoginForm";
import { handleAdminSubmit } from "@/app/admin/admin-login/adminFormHandler";

import { toast } from "react-toastify";
import { redirect } from "next/navigation";
export default function AdminLogin() {
  const [state, formAction] = useFormState(handleAdminSubmit, null);

  useEffect(() => {
    if (state && state.success) {
      toast.success("Login Successful");

      const user = localStorage.getItem("user");
      if (user) {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(state.user));
      }
      redirect("/admin");
    } else if (state) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="bg-inherit h-auto w-full pt-4 flex justify-center items-center">
      <form
        action={formAction}
        className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <AdminLoginForm />
      </form>
    </div>
  );
}
