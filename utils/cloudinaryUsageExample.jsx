// USAGE EXAMPLE
// This is not a component, just a guide showing how to use the Cloudinary utilities
// in your existing component that handles image uploads

"use client";

import { useState } from "react";
import {
  uploadUserProfilePhoto,
  deleteUserProfilePhoto,
} from "./cloudinaryUtils";

/**
 * How to use the Cloudinary utility functions in your existing upload component
 *
 * This is just an example - integrate these functions into your actual component
 */
export function YourExistingProfileComponent({ user }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  /**
   * Handle profile photo upload
   * @param {Event} e - The file input change event
   */
  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError(null);

      // Get the user's ID from your auth context or state
      const userId = user?.id; // Replace with how you access user ID

      // Get the existing photo's public ID if you have it stored
      const oldPublicId = user?.profilePhotoId; // Replace with how you store this

      // Upload the photo
      const result = await uploadUserProfilePhoto(file, userId, oldPublicId);

      if (result.success) {
        // Update user profile with new photo URL and public ID
        // This depends on how you're storing user profile data
        // Example:
        await updateUserProfile({
          photoURL: result.url,
          profilePhotoId: result.publicId,
        });

        // Update local state if needed
        // setUser({ ...user, photoURL: result.url, profilePhotoId: result.publicId });
      } else {
        setUploadError(result.error);
      }
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      setUploadError("Failed to upload profile photo");
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handle profile photo deletion
   */
  const handleDeleteProfilePhoto = async () => {
    if (!user?.profilePhotoId) return;

    try {
      setIsUploading(true);
      setUploadError(null);

      // Delete the photo
      const result = await deleteUserProfilePhoto(user.profilePhotoId);

      if (result.success) {
        // Update user profile to remove photo URL and public ID
        // Example:
        await updateUserProfile({
          photoURL: null,
          profilePhotoId: null,
        });

        // Update local state if needed
        // setUser({ ...user, photoURL: null, profilePhotoId: null });
      } else {
        setUploadError(result.error);
      }
    } catch (error) {
      console.error("Error deleting profile photo:", error);
      setUploadError("Failed to delete profile photo");
    } finally {
      setIsUploading(false);
    }
  };

  // This function would be specific to your app's data storage
  const updateUserProfile = async (updates) => {
    // Example implementation:
    // 1. Update Firebase Auth profile
    // 2. Update Firestore document
    // 3. Update local state
    console.log("Update user profile with:", updates);
  };

  return (
    <div>
      {/* Your existing profile component JSX */}

      {/* Example of file input integration */}
      <div>
        <input
          type="file"
          id="profile-photo"
          accept="image/*"
          onChange={handleProfilePhotoUpload}
          disabled={isUploading}
        />
        <label htmlFor="profile-photo">
          {isUploading ? "Uploading..." : "Choose Profile Photo"}
        </label>

        {user?.photoURL && (
          <button onClick={handleDeleteProfilePhoto} disabled={isUploading}>
            Delete Photo
          </button>
        )}

        {uploadError && <p className="error">{uploadError}</p>}
      </div>
    </div>
  );
}
