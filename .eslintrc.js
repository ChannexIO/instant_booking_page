module.exports = {
  env: {
    "es6": true,
    "browser": true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "react-app",
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "prettier/react",
  ],
  plugins: [
    "@babel",
    "import",
    "jsx-a11y",
    "react",
    "simple-import-sort",
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
    "arrow-body-style": "off",
    "prefer-arrow-callback": [ "error", { "allowNamedFunctions": true } ],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "quotes": ["error", "single"],
    "semi": 1,
    "simple-import-sort/sort": ["error", {
      groups: [
        // Packages. `react` related packages come first.
        ["^react", "^prop-types", "^@?\\w"],
        ["^(pages)"],
        ["^(components)"],
        ["^(containers)"],
        ["^(routing)"],
        ["^(constants|utils)"],
        ["^(static)"],
        // Parent imports. Put `..` last.
        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
        // Other relative imports. Put same-folder imports and `.` last.
        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        // Style imports.
        ["^.+\\.s?css$"],
      ],
    }],
    "object-curly-newline": ["error", {
      "ObjectExpression": {
        "consistent": true,
      },
      "ObjectPattern": {
        "consistent": true,
      },
      "ExportDeclaration": {
        "consistent": true,
      }
    }],
    "import/no-unused-modules": [1, {"unusedExports": true, "src": ["./src"]}],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 1 }],
    "eol-last": ["error", "always"],
  }
}