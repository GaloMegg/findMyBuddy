module.exports = {
  root: true,
  extends: [
    'universe/native',
    'plugin:prettier/recommended',
    "@react-native",
    '@react-native-community'
  ],
  rules: {
    // Ensures props and state inside functions are always up-to-date
    'react-hooks/exhaustive-deps': 'warn',
    // allow .js files to contain JSX code
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx", ".js", ".jsx"] }],
    // prevent eslint to complain about the "styles" variable being used before it was defined
    "no-use-before-define": ["error", { "variables": false }],
    // ignore errors for the react-navigation package
    "react/prop-types": ["error", { "ignore": ["navigation", "navigation.navigate"] }],
    // ignore errors for import directives
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  },
};
