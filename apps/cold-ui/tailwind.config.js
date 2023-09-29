const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { themeColors, fontSizes } = require('../../libs/react/src/themes');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
    './libs/react/src/**/*.{html,js}',
    './libs/react/src/pages/**/*.{js,ts,jsx,tsx}',
    './libs/react/src/components/**/*.{js,ts,jsx,tsx}',
    './libs/react/src/themes/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        ...themeColors(),
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        ...fontSizes(),
      },
      screens: {
        'shortScreen': { 'raw': '(max-height: 1200px)' },
        'shortWideScreen': { 'raw': '(max-height: 1200px) and (min-width: 1800px)' },
      }
    },
    minHeight: (theme) => ({
      ...theme('spacing'),
    }),
    minWidth: (theme) => ({
      ...theme('spacing'),
    }),
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/forms')],
};
