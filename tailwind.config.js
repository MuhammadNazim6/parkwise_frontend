/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'rgba(91, 134, 229, 0.51)',
        'secondary-blue': '#5B86E5',
        'primary-provider':'#0c394f',
        'secondary-provider':'#185f7b',
        'primary-admin':'#21201b',
        'secondary-admin':'#615a4b',
      },
    },
  },
  plugins: [],
}

