module.exports = {
  extends: [
    "eslint:recommended",
    "@nuxt/eslint-config",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["components/**/*.{ts,vue}"],
      rules: {
        "unicorn/filename-case": [
          "error",
          {
            case: "pascalCase",
          },
        ],
      },
    },
  ],
};
