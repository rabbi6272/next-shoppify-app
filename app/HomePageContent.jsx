"use client";

import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export function HomePageContent() {
  return (
    <>
      {/* Hero Section */}
      <motion.div
        className="w-full h-[35vh] md:h-[80vh] xl:h-[100vh]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Splide
          options={{
            type: "loop",
            rewind: true,
            rewindSpeed: 3000,
            autoplay: true,
            interval: 2500,
            arrows: false,
            pagination: true,
            speed: 300,
            pauseOnHover: false,
          }}
          className="w-full h-full"
        >
          <SplideSlide className="relative w-full h-screen">
            <img
              src="https://res.cloudinary.com/ddtd7avvo/image/upload/v1740459706/0-online-shopping-sales-infographics___media_library_original_1600_900_ikndda.jpg"
              alt="Slide 1"
              className="absolute w-full object-cover"
            />
          </SplideSlide>

          <SplideSlide className="relative w-full h-screen">
            <img
              src="https://res.cloudinary.com/ddtd7avvo/image/upload/v1740459792/0-sales-strategy-and-digital-marketing___media_library_original_1600_900_uvgv8v.jpg"
              alt="Slide 2"
              className="absolute w-full object-cover"
            />
          </SplideSlide>

          <SplideSlide className="relative w-full h-screen">
            <img
              src="https://res.cloudinary.com/ddtd7avvo/image/upload/v1740459846/0-online-minimarket-social-media-strategy___media_library_original_1600_900_hnbhmr.jpg"
              alt="Slide 3"
              className="absolute w-full object-cover"
            />
          </SplideSlide>

          <SplideSlide className="relative w-full h-screen">
            <img
              src="https://res.cloudinary.com/ddtd7avvo/image/upload/v1740459939/0-shopping-center-sales___media_library_original_1600_900_jies32.jpg"
              alt="Slide 4"
              className="absolute w-full object-cover"
            />
          </SplideSlide>
        </Splide>
      </motion.div>

      <br />
      <br />
      {/* Newsletter Section */}
      <motion.div
        className="w-full px-4 text-center bg-buttonPrimary text-white py-7 rounded-t-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl lg:text-4xl font-semibold mb-2 lg:mb-4">
          Stay Updated
        </h2>
        <p className="mb-8">
          Subscribe to our newsletter for the latest updates and exclusive
          offers.
        </p>
        <div className="max-w-md mx-auto relative">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-4 rounded-full text-text focus:outline-none "
          />
          <button className="buttonInsideInput bg-buttonPrimary hover:bg-buttonSecondary transition-colors px-6 py-2 rounded-full">
            Subscribe
          </button>
        </div>
      </motion.div>
    </>
  );
}

const features = [
  {
    icon: "🎬",
    title: "Latest Movies",
    description:
      "Access to the newest releases and blockbusters as soon as they hit the screens.",
  },
  {
    icon: "🍿",
    title: "Premium Experience",
    description:
      "Enjoy high-quality streaming with immersive sound and crystal-clear picture quality.",
  },
  {
    icon: "📱",
    title: "Watch Anywhere",
    description:
      "Stream your favorite movies on any device, anytime, with our responsive platform.",
  },
];
