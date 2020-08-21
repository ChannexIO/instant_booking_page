module.exports = {
  extends: [
    "react-app",
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "prettier/react"
  ],
  plugins: [
    "jsx-a11y",
    "prettier"
  ],
  settings: {
    "import/resolver": {
      "webpack": {
        "config": "./node_modules/react-scripts/config/webpack.config.js"
      }
    }
  },
  rules: {
    "react/prop-types": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "quotes": ["error", "single"],
    "semi": 1,
  }
}