"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";

export function SmallNavigationDrawer() {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <IconButton
        color="white"
        onClick={openDrawer}
        className="bg-gray-800 text-white text-lg rounded-full"
      >
        <i className="fa-solid fa-bars" />
      </IconButton>
      <Drawer placement="right" open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Shopping Cart
          </Typography>
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
        <List>
          <Link onClick={closeDrawer} href="/">
            <ListItem>Home</ListItem>
          </Link>
          <Link onClick={closeDrawer} href="/about">
            <ListItem>About</ListItem>
          </Link>
          <Link onClick={closeDrawer} href="/contact">
            <ListItem>Contact</ListItem>
          </Link>
          <Link onClick={closeDrawer} href="/products">
            <ListItem>Products</ListItem>
          </Link>
          <Link onClick={closeDrawer} href="/admin-login">
            <ListItem>Login</ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
}
