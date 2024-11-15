"use client";
import React from "react";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";

export function BackgroundBeamsDemo() {
  return (
    <div className="relative h-screen w-full rounded-md bg-neutral-950  flex flex-col items-center justify-center antialiased">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Buy anything from anywhere
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex esse
          doloremque eos culpa impedit voluptas alias ad porro non mollitia,
          earum error cum dolore provident iure reiciendis nam dolor
          reprehenderit! Dolor quod debitis ipsam voluptates? Recusandae quidem
          possimus natus ullam exercitationem fugit eos quibusdam inventore
          sapiente voluptatem doloremque, unde facere magnam iste culpa
          reprehenderit molestias aliquam ipsa reiciendis temporibus id.
        </p>
        <Link
          href="/products"
          className="px-6 py-2 rounded-full bg-neutral-700 hover:bg-neutral-800 hover:drop-shadow-xl z-10 inline-block"
        >
          Shop Now →
        </Link>
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
}
