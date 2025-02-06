import withMT from "@material-tailwind/react/utils/withMT";
import flowbite from "flowbite-react/tailwind";

export default withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      colors: {
        primary: "#fbe4d8",
        secondary: "#dfb6b2",
        buttonPrimary: "#522b88",
        buttonSecondary: "#2b124c",
        text: "#190019",
      },
    },
  },
  plugins: [flowbite.plugin()],
});
