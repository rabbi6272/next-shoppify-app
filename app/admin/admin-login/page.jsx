"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import useUserStore from "@/lib/store/store";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const router = useRouter();

  const [pending, setPending] = useState(false);
  const [adminState, setAdminState] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  const setUser = useUserStore((state) => state.setUser);

  async function handleAdminSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const rememberme = formData.get("rememberme") === "on";

    const data = {
      email: email,
      password: password,
      rememberme: rememberme,
    };

    if (!data.email || !data.password) {
      return toast.error("Please fill all the fields");
    }

    try {
      setPending(true);
      const res = await fetch(`/api/admin/adminLogin`, {
        method: "POST",
        body: formData,
      });
      const { success, message, user } = await res.json();
      if (success) {
        setPending(false);
        const savedAdmin = localStorage.getItem("user_id");
        if (savedAdmin) {
          localStorage.removeItem("user_id");
        }
        localStorage.setItem("user_id", JSON.stringify(user._id));
        setUser(user);
        toast.success(message);
        router.push("/admin");
      } else {
        setPending(false);
        toast.error(message);
      }
    } catch (error) {
      setPending(false);
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="bg-inherit h-auto w-full pt-4 flex justify-center items-center">
      <form
        className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={(e) => handleAdminSubmit(e)}
      >
        <Card color="white" shadow={"true"} className=" p-4 ">
          <Typography variant="h3" color="blue-gray" className="text-center">
            Log In
          </Typography>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              Your Email
            </Typography>
            <Input
              name="email"
              size="md"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={adminState.email}
              onChange={(e) =>
                setAdminState({ ...adminState, email: e.target.value })
              }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              Password
            </Typography>
            <Input
              name="password"
              type="password"
              size="md"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={adminState.password}
              onChange={(e) =>
                setAdminState({ ...adminState, password: e.target.value })
              }
            />
          </div>
          <div className="inline-flex items-center">
            <label className="relative flex items-center cursor-pointer p-3 rounded-full -ml-2.5">
              <input
                name="rememberme"
                type="checkbox"
                className="peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-gray-900 checked:border-gray-900 checked:before:bg-gray-900"
                checked={adminState.rememberme}
                onChange={(e) =>
                  setAdminState({
                    ...adminState,
                    rememberme: e.target.checked,
                  })
                }
              />
              <span className="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label className="text-gray-700 font-light select-none cursor-pointer mt-px">
              <p className="antialiased font-sans text-sm leading-normal text-gray-700 flex items-center font-normal">
                Keep me logged in
              </p>
            </label>
          </div>
          <Button
            className="mt-6 flex items-center justify-center"
            fullWidth
            type="submit"
            disabled={pending}
            loading={pending}
          >
            {pending ? "Signing in..." : "sign in"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don&apos;t have an account?{" "}
            <Link
              href="/admin/admin-signup"
              className="font-medium text-gray-900"
            >
              Sign Up
            </Link>
          </Typography>
        </Card>
      </form>
    </div>
  );
}
