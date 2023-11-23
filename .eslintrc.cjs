module.exports = {
  extends: [
    "eslint:recommended",
    "@nuxtjs/eslint-config-typescript",
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
