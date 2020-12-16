module.exports = {
  extends: ["stylelint-config-recommended"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "if",
          "include",
          "function",
          "else",
          "return",
          "mixin",
          "each"
        ]
      }
    ],
    "block-no-empty": null,
    "no-empty-source": null,
    "unit-whitelist": ["em", "rem", "%", "px", "vh", "vw", "deg"],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "max-nesting-depth": 4,
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["user-drag", "font-smooth"]
      }
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"]
      }
    ]
  }
};
