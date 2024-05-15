const colors =
{
  SailorBlue: {
    900 :'#00203FFF'

  } ,
  Mint:{
    900: '#ADEFD1FF'

  } ,
  RoyalPurple:{
    900:'#603F83FF'},
     Eclipse:{ 900:'#343148FF'}
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:colors
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // ...
  ],
};
