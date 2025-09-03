// This client-side configuration only includes public information
// and is safe to use in client components

const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  uploadPreset:
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "user_avatars",
};

// Log cloud name on load to help with debugging
if (typeof window !== "undefined") {
  console.log(
    "Cloudinary config loaded, cloud name:",
    cloudinaryConfig.cloudName || "NOT SET"
  );
  if (!cloudinaryConfig.cloudName) {
    console.warn(
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set"
    );
  }
}

export default cloudinaryConfig;
