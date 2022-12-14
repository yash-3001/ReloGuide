module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: 'Hind Siliguri',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '30px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1170px',
    },
    extend: {
      colors: {
        dark: '#292830',
        light: '#BDBDBD',
        accent: '#6963FF',
        accentHover: '#1B99D4',
        grey: '#F5F5F5',
      },
      backgroundImage: {
        hero1: "url('/src/assests/img/hero/move.svg')",
        overview: "url('/src/assests/img/overview/bg.svg')",
        cta: "url('/src/assests/img/cta/bg.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}