import { themeColors, fontSizes } from "./themes/cold_theme";

const defaultTheme = require("tailwindcss/defaultTheme");

 export const tailwindPresets = {
   content: [
     "./src/**/*.{html,js}",
     "./src/pages/**/*.{js,ts,jsx,tsx}",
     "./src/components/**/*.{js,ts,jsx,tsx}",
     "./src/themes/**/*.{js,ts,jsx,tsx}",
     "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
     "./node_modules/flowbite/**/*.js",
   ],
   mode: 'jit',
   theme: {
     extend: {
       colors: {
         ...themeColors()
       },
       fontFamily: {
         sans: ['Inter', ...defaultTheme.fontFamily.sans],
       },
       fontSize: {
         ...fontSizes()
       },
     },
     minHeight: (theme:any) => ({
       ...theme('spacing'),
     }),
     minWidth: (theme:any) => ({
       ...theme('spacing'),
     }),
   },
   plugins: [
     require('flowbite/plugin'),
     require('@tailwindcss/forms'),
   ],
 };
