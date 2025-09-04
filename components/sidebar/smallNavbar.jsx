"use client";

import React from "react";
import Link from "next/link";
import localFont from "next/font/local";

import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import { UserAvatar } from "./UserAvatar";
import { useAuth } from "@/lib/AuthProvider";
import { toast } from "react-hot-toast";

const ttTrailer = localFont({
  src: "../../app/fonts/TT_Trailer/TT Trailers Trial ExtraBold Italic.ttf",
  display: "swap",
  weight: "800",
});

export function SmallNavigationDrawer() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const { user, logout } = useAuth();

  async function userLogout(e) {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while logging out");
    }
  }

  return (
    <React.Fragment>
      <button
        onClick={openDrawer}
        className="p-2 text-black text-lg bg-transparent"
      >
        <i className="fa-solid fa-bars" />
      </button>

      <Drawer open={open} onClose={closeDrawer} placement="right">
        <div className="flex items-center justify-between p-4">
          <Link href="/" onClick={closeDrawer}>
            <Typography
              variant="h5"
              color="blue-gray"
              className={`${ttTrailer.className} -tracking-tight text-3xl font-bold text-buttonSecondary`}
            >
              Shoppify 🛒
            </Typography>
          </Link>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div className="small-navbar flex flex-col justify-between">
          <List>
            <Link href="/" onClick={closeDrawer}>
              <ListItem>
                <ListItemPrefix>
                  <span className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    <i className="fa-solid fa-house fa-lg"></i>
                  </span>{" "}
                </ListItemPrefix>
                Home
              </ListItem>
            </Link>
            <Link href="/about" onClick={closeDrawer}>
              <ListItem>
                <ListItemPrefix>
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                </ListItemPrefix>
                About
              </ListItem>
            </Link>
            <Link href="/products" onClick={closeDrawer}>
              <ListItem>
                <ListItemPrefix>
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>
                </ListItemPrefix>
                Products
              </ListItem>
            </Link>

            {user?.role === "admin" && (
              <Link href="/admin/dashboard" onClick={closeDrawer}>
                <ListItem>
                  <ListItemPrefix>
                    <svg
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                  </ListItemPrefix>
                  Dashboard
                </ListItem>
              </Link>
            )}

            {!user && (
              <Link href="/auth/login" onClick={closeDrawer}>
                <ListItem>
                  <ListItemPrefix>
                    <svg
                      className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                      />
                    </svg>
                  </ListItemPrefix>
                  Log in
                </ListItem>
              </Link>
            )}
          </List>

          {user && (
            <Link href="/profile" onClick={closeDrawer}>
              <div className="bg-[#c8d8e1] w-full absolute bottom-0 flex gap-2 items-center p-2  cursor-pointer">
                {/* <UserAvatar photoUrl={user?.photoURL} /> */}

                <span>
                  <p className="text-sm font-semibold"> {user?.displayName}</p>
                  <p className="text-xs">{user?.email}</p>
                </span>
              </div>
            </Link>
          )}
        </div>
      </Drawer>
    </React.Fragment>
  );
}
