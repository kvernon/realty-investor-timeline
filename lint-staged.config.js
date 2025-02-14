module.exports = {
  '*.ts': [
  'eslint --config .eslintrc.json --cache --fix',
  'jest --findRelatedTests --passWithNoTests'
],
  '*.{ts,css,md}': 'prettier --write'
};
