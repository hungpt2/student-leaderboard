//? README: https://tailwindcss.com/docs/configuration

// const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    enabled: false,
  },
  theme: {
    screens: { // Match with ant-design breakpoint https://www.antdv.com/components/layout/
      xs: '480px', // => @media (min-width: 480px) { ... }
      sm: '576px', // => @media (min-width: 576px) { ... }
      md: '768px', // => @media (min-width: 768px) { ... }
      lg: '992px', // => @media (min-width: 992px) { ... }
      xl: '1200px', // => @media (min-width: 1200px) { ... }
      xxl: '1600px', // => @media (min-width: 1600px) { ... }
    },
    extend: {
      height: {
        em: '1em',
      }
    },
    container: {},
  },
  variants: {},
  plugins: [
    require('tailwindcss-theming')({
      themes: 'src/config/theme.js',
      strategy: 'class',
    }),
  ],
  corePlugins: {}
}
