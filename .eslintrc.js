module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "amd": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": 1,
    "no-debugger": 2,
    "space-before-blocks": 2,
    "no-var": 2
  }
};