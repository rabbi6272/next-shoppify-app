"use client";

import { motion } from "framer-motion";
import { UserDataFetcher } from "@/components/custom/DataFetcher";
import HeroSlideshow from "@/app/Herosection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <UserDataFetcher />
      {/* Hero Section */}
      <HeroSlideshow />

      {/* Features Section */}
      {/* <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-buttonPrimary">
                  {feature.title}
                </h3>
                <p className="text-text">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Newsletter Section */}
      <section className="bg-buttonPrimary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-2 lg:mb-4">
            Stay Updated
          </h2>
          <p className="mb-8">
            Subscribe to our newsletter for the latest updates and exclusive
            offers.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2 lg:gap-4 flex-col md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full text-text focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.3 }}
                className="bg-black px-6 py-2 rounded-full "
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: "🛍️",
    title: "Quality Products",
    description:
      "Carefully selected items that meet our high standards of quality and style.",
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping to get your favorite items to you as soon as possible.",
  },
  {
    icon: "💎",
    title: "Best Prices",
    description:
      "Competitive prices and regular deals to give you the best value for your money.",
  },
];
