module.exports = {
          darkMode: 'class', // ← لازم تكون class علشان نتحكم فيه يدويًا

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
 theme: {
    extend: {
      colors: {
        primaryBg: '#F5F2F4',
        darkBg: '#1A1A1A',
        darkGreen: '#465542',
        yellowAccent: '#C2B823',
        grayMedium: '#A5A1A4',
        lightText: '#F5F2F4',
        darkText: '#333333',
        
      }
    }
  },
  plugins: [],
}