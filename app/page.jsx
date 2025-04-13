"use client";

import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-auto"
    >
      {/* Hero Section */}
      <div className="w-full h-[35vh] md:h-[80vh] xl:h-[100vh]">
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
      </div>

      {/* Features Section */}
      <div className="w-[95%] md:w-full mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-text">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-buttonPrimary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                duration: 0.2,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-buttonPrimary rounded-xl p-8 text-center hover:bg-buttonSecondary  shadow-lg border border-gray-700"
            >
              <motion.div
                className="text-4xl mb-4 mx-auto bg-buttonPrimary w-16 h-16 flex items-center justify-center rounded-full"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 text-center bg-buttonPrimary text-white py-7 rounded-t-lg">
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
          <button className="buttonInsideInput bg-buttonPrimary hover:bg-buttonSecondary transition-colors  px-6 py-2 rounded-full ">
            Subscribe
          </button>
        </div>
      </div>
    </motion.div>
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
