"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import useUserStore from "@/lib/store/store";

export function SmallNavigationDrawer() {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // useEffect(() => {
  //   if (user) return;
  //   async function fetchUser() {
  //     const res = await fetch(`/api/admin/getAdmin`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const { user } = await res.json();
  //     setUser(user);
  //   }
  //   fetchUser();
  // }, []);

  return (
    <>
      <IconButton
        onClick={openDrawer}
        className="text-black text-lg bg-transparent"
      >
        <i className="fa-solid fa-bars" />
      </IconButton>
      <Drawer
        placement="right"
        open={open}
        onClose={closeDrawer}
        className="bg-inherit z-50"
      >
        <div className="mb-2 flex items-center justify-between p-4 bg-white">
          <Typography variant="h5" color="blue-gray">
            Shopping Cart
          </Typography>
          <IconButton variant="text" color="black" onClick={closeDrawer}>
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
        <List className="bg-white z-50">
          <Link onClick={closeDrawer} href="/">
            <ListItem>Home</ListItem>
          </Link>
          <Link onClick={closeDrawer} href="/about">
            <ListItem>About</ListItem>
          </Link>
          {user ? (
            <Link onClick={closeDrawer} href="/admin">
              <ListItem>Dashboard</ListItem>
            </Link>
          ) : (
            <Link onClick={closeDrawer} href="/admin/admin-login">
              <ListItem>Login</ListItem>
            </Link>
          )}
        </List>
      </Drawer>
    </>
  );
}
