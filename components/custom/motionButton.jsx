"use client";
import React from "react";
import { motion } from "framer-motion";

export function MotionButton({ children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="px-6 py-2 rounded-full bg-buttonPrimary hover:bg-buttonSecondary text-white"
    >
      {children}
    </motion.button>
  );
}
