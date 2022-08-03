module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1db954',
          dark: '#191414',
          grey: '#535353',
          'light-grey': '#b3b3b3'
        }
      },
      fontFamily: {
        spotify: ["GothamMedium"]
      }
    },
  },
  plugins: [],
};
