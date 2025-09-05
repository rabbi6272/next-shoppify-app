import localFont from "next/font/local";
import { Inter, Space_Grotesk, Nunito } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], display: "swap" });

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const nunito = Nunito({ subsets: ["latin"], display: "swap" });

export const ttTrailer = localFont({
  src: "./TT_Trailer.ttf",
  display: "swap",
  weight: "800",
});
