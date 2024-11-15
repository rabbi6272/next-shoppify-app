import Link from "next/link";
import connectDB from "@/lib/DB/connectDB";
import { BackgroundBeamsDemo } from "@/components/custom/backgroundBeams";

export default function Home() {
  connectDB();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center antialiased">
      {" "}
      <div className=" mx-auto text-center">
        <h1 className="text-lg md:text-6xl bg-clip-text  bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold">
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
