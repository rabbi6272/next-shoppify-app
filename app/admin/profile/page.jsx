"use client";
import useUserStore from "@/lib/store/store";
import React from "react";

function Profile() {
  const user = useUserStore((state) => state.user);
  return (
    <div>
      <h2>{user.name}</h2>
    </div>
  );
}

export default Profile;
