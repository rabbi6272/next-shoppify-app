"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import useUserStore from "@/lib/store/store";

export default function AdminLoginForm() {
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
    const name = formData.get("name");

    const data = {
      email: email,
      password: password,
      name: name,
    };

    if (!data.email || !data.password || !data.name) {
      return toast.error("Please fill all the fields");
    }

    try {
      setPending(true);
      const res = await fetch(`/api/admin/admin-signup`, {
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
        localStorage.setItem("user_id", JSON.stringify(user_id));
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
        onSubmit={handleAdminSubmit}
      >
        <Card color="white" shadow={"true"} className=" p-4 ">
          <Typography variant="h3" color="blue-gray" className="text-center">
            Sign Up
          </Typography>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              Your Name
            </Typography>
            <Input
              name="name"
              required
              size="md"
              placeholder="John Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={adminState.name}
              onChange={(e) =>
                setAdminState({ ...adminState, name: e.target.value })
              }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              Your Email
            </Typography>
            <Input
              name="email"
              required
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
              required
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

          <Button
            className="mt-6 flex items-center justify-center"
            fullWidth
            type="submit"
            disabled={pending}
            loading={pending}
          >
            {pending ? "Signing up..." : "Sign up"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              href="/admin/admin-login"
              className="font-medium text-gray-900"
            >
              Log in
            </Link>
          </Typography>
        </Card>
      </form>
    </div>
  );
}
