module.exports = {
  '*.{js,css,ts,tsx}': ['prettier --write', 'eslint'],
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};
