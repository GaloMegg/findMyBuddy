module.exports = {
  root: true,
  extends: ['universe/native', 'plugin:prettier/recommended', "@react-native"],
  rules: {
    // Ensures props and state inside functions are always up-to-date
    'react-hooks/exhaustive-deps': 'warn',
  },
};
