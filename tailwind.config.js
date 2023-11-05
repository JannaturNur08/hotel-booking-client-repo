/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: "'Jost', 'sans-serif'",
        mercellus : "'Marcellus', 'serif'"
       
      },
      colors : {
        primary : "#53624E",
        
      },
      hover : {
        bg_color : '#AB916C',
      },
      textColor : {
        secondary : "#5B6956",
      }
    },
  },
  plugins: [require("daisyui")],
}

