/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  purge: ["./src/**/*.html", "./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {
      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [require("daisyui")],
}