module.exports = {
  '*.ts': [
  'eslint --config .eslintrc.json --cache --fix',
  'jest --findRelatedTests'
],
  '*.{ts,css,md}': 'prettier --write'
};
