/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        section: '0px -4px 0px 0px #000',
        article: '4px 4px 0px 0px #25312A',
        button: '2px 2px 0px 0px #121212',
        input: '0.5px 2px 0px 0px #000',
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
      },
      fontFamily: {
        Agbalumo: ['Agbalumo, system-ui'],
        Nunito: ['Nunito, sans-serif'],
        Fredoka: ['Fredoka, sans-serif'],
      },
    },
  },
  plugins: [],
}
