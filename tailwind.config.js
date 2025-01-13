/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/plugin.js"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [import("./node_modules/flowbite/plugin.js")],
};
