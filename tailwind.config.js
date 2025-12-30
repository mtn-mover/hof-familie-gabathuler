/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3f0',
          100: '#e8e3da',
          200: '#d4cbbf',
          300: '#bfb19f',
          400: '#a7937b',
          500: '#8f7558',
          600: '#7a6248',
          700: '#634f3a',
          800: '#4a3a31',
          900: '#352a24',
        },
        secondary: {
          50: '#f0f7f4',
          100: '#d9ebe3',
          200: '#b5d9c9',
          300: '#85c2a8',
          400: '#5aa785',
          500: '#418b68',
          600: '#2f6f51',
          700: '#265a42',
          800: '#1f4836',
          900: '#1a3c2d',
        },
        accent: {
          50: '#fef6e6',
          100: '#fde9c4',
          200: '#fbd68f',
          300: '#f8be54',
          400: '#f5a623',
          500: '#ed900f',
          600: '#d16a0a',
          700: '#ae4f0c',
          800: '#8d3f11',
          900: '#743511',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #8f7558 0%, #418b68 100%)',
      },
    },
  },
  plugins: [],
}
