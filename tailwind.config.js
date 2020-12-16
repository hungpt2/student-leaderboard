//? README: https://tailwindcss.com/docs/configuration

const theme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    enabled: false
  },
  theme: {
    ...theme
  },
  variants: {},
  corePlugins: {}
};
