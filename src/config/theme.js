/* eslint-disable */
const { ThemeManager, Theme } = require('tailwindcss-theming/api');
const { colors } = require('tailwindcss/defaultTheme'); // default tailwind color

const base = new Theme().addColors({
  ...colors,
});

module.exports = new ThemeManager().setDefaultTheme(base)
