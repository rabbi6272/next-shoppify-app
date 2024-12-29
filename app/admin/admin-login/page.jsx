"use client";
import { useFormState } from "react-dom";
import { useEffect } from "react";

import AdminLoginForm from "@/components/custom/AdminLoginForm";
import { handleAdminSubmit } from "@/app/admin/admin-login/adminFormHandler";

import { toast } from "react-toastify";
export default function AdminLogin() {
  const [state, formAction] = useFormState(handleAdminSubmit, null);

  useEffect(() => {
    if (state && state.success) {
      toast.success("Login Successful");
      setTimeout(() => (window.location.href = "/admin"), 1500);
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
