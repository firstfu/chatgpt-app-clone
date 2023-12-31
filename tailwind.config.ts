import type { Config } from "tailwindcss";

const config: Config = {
  // 手動模式
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      //   backgroundImage: {
      //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //     "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      //   },
      primary: {
        500: "#00B981",
        600: "#059669",
      },
    },
  },
  plugins: [],
};
export default config;
