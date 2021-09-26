module.exports = {
  '*.ts': [
  'eslint --config .eslintrc.json --cache --fix',
  'npm run test:related -- '
],
  '*.{ts,css,md}': 'prettier --write'
};
