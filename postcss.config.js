const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
