"use client";
import { useState, useEffect } from "react";
export default function useSetUser() {
  const [user, setUser] = useState(null);
  return { user, setUser };
}
