"use client";
import React from "react";
import "ldrs/infinity";

function Loader() {
  return (
    <div className="h-full flex items-center justify-center">
      <l-infinity
        size="75"
        stroke="7"
        stroke-length="0.20"
        bg-opacity="0.1"
        speed="2"
        color="black"
      ></l-infinity>
    </div>
  );
}

export default Loader;
