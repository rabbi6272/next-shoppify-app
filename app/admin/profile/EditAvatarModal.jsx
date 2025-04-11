"use client";
import React from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import useUserStore from "@/lib/store/store";

export function EditAvatarModal() {
  const setUser = useUserStore((state) => state.setUser);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [formState, setFormState] = useState({
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  async function handleEditAvatarFormSubmit(e) {
    e.preventDefault();

    const inputData = new FormData(e.target);
    inputData.append("file", formState.file);

    if (!inputData.get("file")) {
      return toast.error("Please fill up all the fields");
    }

    try {
      const response = await fetch(`/api/admin/editAvatar`, {
        method: "POST",
        body: inputData,
        credentials: "include",
      });

      const { message, updatedAdmin } = await response.json();

      if (updatedAdmin) {
        setUser(updatedAdmin);
        toast.success(message);
        handleOpen();
      }
    } catch (error) {
      toast.error("Something went wrong");
      handleOpen();
    }
  }

  return (
    <>
      <span
        onClick={handleOpen}
        className="bg-blue-500 w-[45px] lg:w-[50px] h-[45px] lg:h-[50px] grid place-items-center absolute bottom-[5%] right-[5%] rounded-full text-white cursor-pointer hover:bg-blue-600"
      >
        <i className="fa-regular fa-pen-to-square fa-lg"></i>
      </span>
      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <form onSubmit={handleEditAvatarFormSubmit}>
          <DialogHeader className="text-center">
            Edit Profile Picture
          </DialogHeader>
          <DialogBody>
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" required onChange={handleChange} />
            {/* <Input
              label="Profile Picture"
              type="file"
              name="file"
              accept="image/*"
              required
              className="border-none"
              onChange={handleChange}
            /> */}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
