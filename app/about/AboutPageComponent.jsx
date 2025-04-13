"use client";
import Link from "next/link";
import localFont from "next/font/local";

import { motion } from "framer-motion";

const ttTrailer = localFont({
  src: "../fonts/TT_Trailer/TT Trailers Trial ExtraBold.ttf",
  display: "swap",
  weight: "800",
});

export default function AboutPageComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1
            className={`${ttTrailer.className} font-extrabold text-buttonPrimary text-5xl md:text-6xl -tracking-tight`}
          >
            About Shoppify
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your premier destination for seamless online shopping experience
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, staggerChildren: 0.2 }}
        >
          <h2 className={` text-3xl font-semibold text-center mt-10`}>
            Why Choose Us?
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <div className="text-indigo-600 text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Curated Selection
              </h3>
              <p className="text-gray-600">
                Discover our handpicked collection of premium products from
                trusted brands worldwide.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <div className="text-indigo-600 text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Experience lightning-fast shipping and real-time tracking on all
                your orders.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <div className="text-indigo-600 text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Quality Guarantee
              </h3>
              <p className="text-gray-600">
                We stand behind every product with our satisfaction guarantee
                policy.
              </p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2023, ShopCart has grown from a small startup to a
            trusted e-commerce platform. We&apos;re passionate about connecting
            customers with quality products and providing an exceptional
            shopping experience. Our commitment to innovation and customer
            satisfaction drives everything we do.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Shopping?
          </h2>
          <Link href="/products">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, duration: 0.3 }}
              className="bg-buttonPrimary hover:bg-buttonSecondary text-white px-8 py-3 rounded-full font-medium "
            >
              Explore Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
