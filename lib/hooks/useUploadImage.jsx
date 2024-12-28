"use client";

import { useState, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function useUploadImage() {
  const [secureUrl, setSecureUrl] = useState("");

  const handleUploadSuccess = useCallback((result, widget) => {
    try {
      const imageUrl = result.info.secure_url;
      setSecureUrl(imageUrl);
      widget.close();
    } catch (err) {
      // setError("Failed to process uploaded image");
      console.error("Upload processing error:", err);
    }
  }, []);

  const handleUploadError = useCallback((error, widget) => {
    console.error("Upload error:", error);
  }, []);

  const uploadWidget = (
    <CldUploadWidget
      uploadPreset="product-images"
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    >
      {({ open }) => {
        return (
          <div
            className="grid h-36 w-full place-items-center rounded-lg bg-gray-300"
            onClick={() => open()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-[150px] w-12 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
        );
      }}
    </CldUploadWidget>
  );
  const resetUpload = useCallback((widget) => {
    setSecureUrl("");
  }, []);

  return {
    secureUrl,
    uploadWidget,
    resetUpload,
  };
}
