module.exports = {
  '*.{js,css,ts,tsx,md}': ['eslint', 'prettier --write'],
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};
