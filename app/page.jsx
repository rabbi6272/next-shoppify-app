"use client";
import { useEffect } from "react";
import useUserStore from "@/lib/store/store";

export default function Home() {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className="w-full pt-4 flex flex-col items-center justify-center antialiased">
      {" "}
      <div className=" mx-auto text-center">
        <h1 className="px-2 text-[45px] md:text-6xl bg-clip-text  bg-gradient-to-b from-[#e5e5e5] to-[#404040] font-sans font-bold">
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
      </div>
    </div>
  );
}
