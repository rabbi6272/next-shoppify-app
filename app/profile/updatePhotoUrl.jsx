import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { uploadUserProfilePhoto } from "@/utils/cloudinaryUtils";

import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/firebase";
import { useAuthStore } from "@/lib/hooks/useAuthStore";

export function UpdatePhotoUrlDialog() {
  const [open, setOpen] = React.useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { user } = useAuthStore();

  const handleClose = () => setOpen(!open);

  const handleSubmit = async () => {
    // Reset error state
    setUploadError(null);
    setIsUploading(true);

    try {
      // Handle file upload logic here
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];

      if (!file) {
        setUploadError("Please select a file to upload");
        setIsUploading(false);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size exceeds 5MB");
        setIsUploading(false);
        return;
      }

      if (!user) {
        setUploadError("You must be logged in to upload a profile photo");
        setIsUploading(false);
        return;
      }
      const result = await uploadUserProfilePhoto(file, user.uid);
      if (result.success) {
        await updateProfile(auth.currentUser, {
          photoURL: result.url,
        });
        if (user.isAdmin) {
          await updateDoc(doc(db, "admins", user.uid), {
            photoURL: result.url,
            photoID: result.publicId,
          });
        } else {
          await updateDoc(doc(db, "users", user.uid), {
            photoURL: result.url,
            photoID: result.publicId,
          });
        }
        setOpen(false);
      } else {
        setUploadError(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error in upload process:", error);
      setUploadError(error.message || "An unexpected error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <button
        className="bg-indigo-600 text-white size-9 rounded-full hover:bg-indigo-700"
        onClick={handleClose}
        variant="gradient"
      >
        <i className="fa-solid fa-pen text-gray-200"></i>{" "}
      </button>
      <Dialog open={open} handler={handleClose}>
        <DialogHeader>Update Profile Photo</DialogHeader>
        <DialogBody>
          <p className="mb-2">Upload a new profile picture. (Max size: 5MB)</p>
          <input type="file" accept="image/*" className="w-full" />

          {uploadError && (
            <div className="mt-2 text-red-500 text-sm">
              Error: {uploadError}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
            disabled={isUploading}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSubmit}
            disabled={isUploading}
          >
            <span>{isUploading ? "Uploading..." : "Confirm"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
