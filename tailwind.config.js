/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  //Overrides everythin in the styles names category
  theme: {
    //keeps the original things of tailwing but add our own ones
    extend: {
      colors: {
        pizza: "#123456",
      },
    },
  },
  plugins: [],
};
