"use client";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

import { motion } from "framer-motion";
import { UserDataFetcher } from "@/components/custom/DataFetcher";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary to-secondary">
      <UserDataFetcher />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10 flex flex-col lg:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 space-y-6"
        >
          <h1
            className={`${inter.className} text-5xl lg:text-7xl font-extrabold text-buttonSecondary`}
          >
            Discover Unique Fashion
          </h1>
          <p className="text-xl text-text py-2">
            Explore our curated collection of trendy and timeless pieces that
            define your style.
          </p>
          <Link href="/products">
            <button className="bg-buttonPrimary hover:bg-buttonSecondary text-white px-8 py-2 rounded-full transition-all duration-300 text-lg">
              Shop Now
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 mt-10 lg:mt-0"
        >
          <Image
            src="https://i.pinimg.com/736x/8d/16/54/8d1654a089984fed2bf7aea8cb3e1822.jpg"
            alt="Fashion Collection"
            priority
            width={600}
            height={600}
            className="rounded-2xl shadow-xl"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-buttonSecondary mb-16">
            Why Choose Us
          </h2>

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
      </section>

      {/* Newsletter Section */}
      <section className="bg-buttonPrimary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="mb-8">
            Subscribe to our newsletter for the latest updates and exclusive
            offers.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2 lg:gap-4 flex-col lg:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full text-text focus:outline-none"
              />
              <button className="bg-buttonSecondary px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
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
