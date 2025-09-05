"use client";
import {
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useState } from "react";
import Link from "next/link";

import { useAuthStore } from "@/lib/hooks/useAuthStore";
import { UserAvatar } from "./UserAvatar";
import { inter } from "@/app/ui/font";
import { useRouter } from "next/navigation";

export function SmallNavigationDrawerV2() {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <i className="fa-solid fa-bars text-lg" />
      </button>

      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="MENU" titleIcon={() => <></>} />
        <DrawerItems>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div
              className={`${inter.className} flex h-full flex-col justify-between py-2`}
            >
              <div>
                <SidebarItems>
                  <SidebarItemGroup>
                    <Link
                      onClick={handleClose}
                      className="block p-2 active:bg-gray-100 rounded-full"
                      href="/"
                    >
                      <i className="fa-solid fa-house fa-md shrink-0 text-gray-500 transition duration-200 group-hover:text-gray-800"></i>
                      <span className="flex-1 ms-2 whitespace-nowrap text-md text-gray-700">
                        Home
                      </span>
                    </Link>
                    <Link
                      onClick={handleClose}
                      className="block p-2 active:bg-gray-100 rounded-full"
                      href="/about"
                    >
                      <i className="fa-solid fa-circle-info fa-md shrink-0 text-gray-500 transition duration-200 group-hover:text-gray-800"></i>
                      <span className="flex-1 ms-2 whitespace-nowrap text-md text-gray-700">
                        About
                      </span>
                    </Link>
                    <Link
                      onClick={handleClose}
                      className="block p-2 active:bg-gray-100 rounded-full"
                      href="/products"
                    >
                      <i className="fa-solid fa-cart-shopping fa-md shrink-0 text-gray-500 transition duration-200 group-hover:text-gray-800"></i>
                      <span className="flex-1 ms-2 whitespace-nowrap text-md text-gray-700">
                        Products
                      </span>
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        onClick={handleClose}
                        className="block p-2 active:bg-gray-100 rounded-full"
                        href="/admin/dashboard"
                      >
                        <i className="fa-solid fa-chart-pie fa-md shrink-0 text-gray-500 transition duration-200 group-hover:text-gray-800"></i>

                        <span className="flex-1 ms-2 whitespace-nowrap text-md text-gray-700">
                          Admin Dashboard
                        </span>
                      </Link>
                    )}
                  </SidebarItemGroup>
                  <SidebarItemGroup>
                    {user ? (
                      <Link
                        onClick={() => {
                          logout();
                          handleClose();
                        }}
                        className="block p-2 active:bg-gray-100 rounded-full"
                        href="/auth/login"
                      >
                        <i className="fa-solid fa-right-from-bracket fa-md shrink-0 text-gray-500 transition duration-200 group-hover:text-gray-800"></i>
                        <span className="flex-1 ms-2 whitespace-nowrap text-md text-gray-700">
                          Log out
                        </span>
                      </Link>
                    ) : (
                      <>
                        <Link
                          onclick={handleClose}
                          className="block p-2 active:bg-gray-100 rounded-full"
                          href="/auth/login"
                        >
                          <i className="fa-solid fa-right-to-bracket fa-md shrink-0 text-gray-500 transition duration-200 group-hover:text-gray-800"></i>
                          <span className="flex-1 ms-2 whitespace-nowrap text-md text-gray-700">
                            Log in
                          </span>
                        </Link>
                        <Link
                          onclick={handleClose}
                          className="block p-2 active:bg-gray-100 rounded-full"
                          href="/auth/signup"
                        >
                          <i className="fa-solid fa-user-plus fa-md shrink-0 text-gray-500 transition duration-200 group-hover:text-gray-800"></i>
                          <span className="flex-1 ms-2 whitespace-nowrap text-md text-gray-700">
                            Register
                          </span>
                        </Link>
                      </>
                    )}
                  </SidebarItemGroup>
                </SidebarItems>
                <div
                  onClick={() => {
                    handleClose();
                    router.push("/profile");
                  }}
                >
                  {user && (
                    <div className="bg-[#c8d8e1] w-full absolute bottom-0 flex gap-2 items-center p-2  cursor-pointer">
                      <UserAvatar photoUrl={user?.photoURL} />

                      <span>
                        <p className="text-sm font-semibold">
                          {user?.displayName}
                        </p>
                        <p className="text-xs">{user?.email}</p>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </>
  );
}
