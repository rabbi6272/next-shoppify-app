"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import { toast } from "react-toastify";
import useUserStore from "@/lib/store/store";
import { Button } from "@material-tailwind/react";
import { EditAvatarModal } from "@/app/admin/profile/EditAvatarModal";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();

  async function userLogout(e) {
    e.preventDefault();
    if (user === undefined || user === null) return;

    try {
      const res = await fetch("/api/admin/adminLogout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setUser({ user: null });
        toast.success("Logged out successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured while logging out");
    }
  }

  if (user === undefined || user === null) return null;

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-2">
        <span className="relative mx-auto">
          <CldImage
            src={user?.image_id}
            alt={user?.name}
            width={400}
            height={400}
            gravity="face"
            crop="fill"
            className="rounded-full w-[300px] md:w-[350px] lg:w-[400px] h-[300px] md:h-[350px] lg:h-[400px] ring-4 ring-blue-600"
          />
          <EditAvatarModal />
        </span>
        <span className="flex flex-col justify-items-start gap-2 w-[90vw] md:w-[50vw] lg:w-[30vw]">
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-lg">{user?.email}</p>
          <Button
            onClick={userLogout}
            className="rounded-full flex gap-2 items-center justify-center px-4 py-3 text-white cursor-pointer"
          >
            <span className=" text-white ">
              <i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
            </span>
            <span>Log out</span>
          </Button>
        </span>
      </div>
    </div>
  );
}
