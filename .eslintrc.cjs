module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: "@madebywild/eslint-config",
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {},
};
