"use client";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/products/uploadImage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      console.log(data);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="border-2 border-gray-300 py-2 px-6 rounded-full"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full "
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
