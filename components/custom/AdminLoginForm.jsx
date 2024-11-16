"use client";
import { useFormStatus } from "react-dom";
import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import Link from "next/link";

export default function AdminLoginForm() {
  const { pending } = useFormStatus();

  return (
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
          size="lg"
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-6">
          Password
        </Typography>
        <Input
          name="password"
          type="password"
          size="lg"
          placeholder="********"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      <div className="inline-flex items-center">
        <label className="relative flex items-center cursor-pointer p-3 rounded-full -ml-2.5">
          <input
            name="rememberme"
            type="checkbox"
            className="peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-gray-900 checked:border-gray-900 checked:before:bg-gray-900"
            containerProps={{ className: "-ml-2.5" }}
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
        <Link href="/admin-signup" className="font-medium text-gray-900">
          Sign Up
        </Link>
      </Typography>
    </Card>
  );
}
