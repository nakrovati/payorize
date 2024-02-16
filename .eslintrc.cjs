module.exports = {
  extends: [
    "eslint:recommended",
    "@nuxt/eslint-config",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  rules: {
    "unicorn/filename-case": "off",
  },
};
