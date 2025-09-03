"use client";

export const setCookie = (name, value, options = {}) => {
  if (typeof document === "undefined") return;

  const defaultOptions = {
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // Changed from 'strict' to 'lax' for better compatibility
  };

  const cookieOptions = { ...defaultOptions, ...options };

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (cookieOptions.maxAge) {
    cookieString += `; Max-Age=${cookieOptions.maxAge}`;
  }

  if (cookieOptions.path) {
    cookieString += `; Path=${cookieOptions.path}`;
  }

  if (cookieOptions.secure) {
    cookieString += "; Secure";
  }

  if (cookieOptions.sameSite) {
    cookieString += `; SameSite=${cookieOptions.sameSite}`;
  }

  // HttpOnly cookies can only be set by the server, not by client-side JavaScript
  // We're removing this flag for client-side cookies

  document.cookie = cookieString;
};

export const getCookie = (name) => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === encodeURIComponent(name)) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

export const deleteCookie = (name, options = {}) => {
  if (typeof document === "undefined") return;

  const defaultOptions = {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  const cookieOptions = { ...defaultOptions, ...options };

  // Set expiration to past date to delete the cookie
  document.cookie = `${encodeURIComponent(
    name
  )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=${cookieOptions.path}; ${
    cookieOptions.secure ? "Secure; " : ""
  }SameSite=${cookieOptions.sameSite}`;
};
