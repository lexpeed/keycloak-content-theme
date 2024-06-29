/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx, scss}",
    "./templates/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx,scss}",
  ],
  theme: {
    extend: {
      colors: {
        brand_02: "#B8F5ED",
        brand_05: "#38CFCA",
        brand_06: "#16C2C2",
        brand_08: "#016E75",
        brand_10: "#002329",
        danger: "#FF4D4F",
        neutral_01: "#FFFFFF",
        neutral_02: "#F5F5F5",
        neutral_03: "#EEEEEE",
        neutral_04: "#E0E0E0",
        neutral_05: "#BABABA",
        neutral_06: "#9E9E9E",
        neutral_07: "#757575",
        neutral_08: "#5F5F5F",
        neutral_09: "#424242",
        neutral_10: "#212121",
        green_: "#72F345",
        green_dark: "#288A06",
        yellow_: "#EFAA24",
        yellow_dark: "#8A4506",
        red_: "#F2746C",
        red_dark: "#B42219",
      },
      fontFamily: {
        SegoeUI: ["Segoe UI", "Arial", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
