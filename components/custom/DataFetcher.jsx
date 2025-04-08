"use client";
import { useEffect } from "react";
import useUserStore from "@/lib/store/store";

export function UserDataFetcher() {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/admin/getAdmin", {
        credentials: "include",
      });

      const { user, success } = await res.json();
      if (success) {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  return null;
}
