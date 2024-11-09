/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
      'chillgo-background': 'var(--background-color)',
      'chillgo-primary-text': 'var(--primary-text-color)',
      'chillgo-secondary-text': 'var(--secondary-text-color)',
      'chillgo-primary-button': 'var(--primary-button-color)',
      'chillgo-primary-button-highlight': 'var(--primary-button-highlight-color)',
      'chillgo-secondary-button': 'var(--secondary-button-color)',
      'chillgo-secondary-button-darker': 'var(--secondary-button-darker-color)',
      'chillgo-secondary-button-highlight': 'var(--secondary-button-highlight-color)',
      'chillgo-secondary-button-highlight-lighter': 'var(--secondary-button-highlight-lighter-color)',
      'chillgo-special-color': 'var(--special-color)',
      'chillgo-secondary-special': 'var(--secondary-special-color)',
      'chillgo-primary-color': '#5a1ccd',
      'chillgo-secondary-color': '#CDEE00',
      }
    },
  },
  plugins: [],
}

