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
import { FileInput, Label } from "flowbite-react";
import { toast } from "react-toastify";
import useUserStore from "@/lib/store/store";
import { set } from "mongoose";

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
    }
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        className="bg-blue-400 absolute bottom-[5%] left-[5%] rounded-full"
      >
        Edit
      </Button>
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
            <div className="mb-2 block">
              <Label htmlFor="file-upload" value="Profile Picture" />
            </div>
            <FileInput id="file-upload" name="file" onChange={handleChange} />
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
