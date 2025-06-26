// stylelint.config.js - PREVENT HARDCODED VALUES
module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-prettier-scss"],
  plugins: ["stylelint-scss"],
  rules: {
    // Prevent hardcoded colors
    "color-no-hex": [
      true,
      {
        message:
          "Use SCSS color variables instead of hex values (e.g., $primary-color)",
      },
    ],

    // Prevent hardcoded font sizes
    "declaration-property-value-disallowed-list": {
      "font-size": [
        "/^\\d+px$/", // No pixel values
        "/^\\d*\\.?\\d+rem$/", // No rem values
        "/^\\d*\\.?\\d+em$/", // No em values
      ],
      width: ["/^\\d+px$/"],
      height: ["/^\\d+px$/"],
      padding: ["/^\\d+px$/"],
      margin: ["/^\\d+px$/"],
      gap: ["/^\\d+px$/"],
      "border-radius": ["/^\\d+px$/"],
    },

    // Require variables import
    "scss/at-import-partial-extension": "never",

    // Custom rules for our variables
    "custom-property-pattern": [
      "^[a-z][a-zA-Z0-9-]*$",
      {
        message: "Use kebab-case for custom properties",
      },
    ],

    // SCSS specific rules
    "scss/dollar-variable-pattern": [
      "^[a-z][a-zA-Z0-9-]*$",
      {
        message: "Use kebab-case for SCSS variables",
      },
    ],

    // Require variables for colors
    "function-disallowed-list": ["rgb", "rgba", "hsl", "hsla"],

    // Order rules
    "order/order": ["custom-properties", "declarations"],

    "order/properties-order": [
      "content",
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "flex-direction",
      "justify-content",
      "align-items",
      "width",
      "height",
      "margin",
      "padding",
      "background",
      "border",
      "font-family",
      "font-size",
      "color",
    ],
  },

  ignoreFiles: ["node_modules/**/*", "build/**/*", ".next/**/*"],
};
