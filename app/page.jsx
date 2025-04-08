"use client";

import { motion } from "framer-motion";
import { UserDataFetcher } from "@/components/custom/DataFetcher";
import HeroSlideshow from "@/app/Herosection";

export default function Home() {
  return (
    <div className="h-auto">
      <UserDataFetcher />
      {/* Hero Section */}
      <HeroSlideshow />

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-background to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
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
      </section>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-buttonPrimary text-white py-7"
      >
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
      </motion.div>
    </div>
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

// "use client";

// import { motion } from "framer-motion";
// import { UserDataFetcher } from "@/components/custom/DataFetcher";
// import HeroSlideshow from "@/app/Herosection";

// export default function Home() {
//   return (
//     <div className="h-auto">
//       <UserDataFetcher />
//       {/* Hero Section */}
//       <HeroSlideshow />

//       {/* Features Section */}

//       {/* Newsletter Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-buttonPrimary text-white py-7"
//       >
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl lg:text-4xl font-semibold mb-2 lg:mb-4">
//             Stay Updated
//           </h2>
//           <p className="mb-8">
//             Subscribe to our newsletter for the latest updates and exclusive
//             offers.
//           </p>
//           <div className="max-w-md mx-auto">
//             <div className="flex gap-2 lg:gap-4 flex-col md:flex-row">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-4 py-2 rounded-full text-text focus:outline-none"
//               />
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ type: "spring", stiffness: 100, duration: 0.3 }}
//                 className="bg-black px-6 py-2 rounded-full "
//               >
//                 Subscribe
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// const features = [
//   {
//     icon: "🛍️",
//     title: "Quality Products",
//     description:
//       "Carefully selected items that meet our high standards of quality and style.",
//   },
//   {
//     icon: "🚚",
//     title: "Fast Delivery",
//     description:
//       "Quick and reliable shipping to get your favorite items to you as soon as possible.",
//   },
//   {
//     icon: "💎",
//     title: "Best Prices",
//     description:
//       "Competitive prices and regular deals to give you the best value for your money.",
//   },
// ];
