export default {
  '*.ts': ['eslint --cache --fix', 'jest --findRelatedTests --passWithNoTests'],
  '*.{ts,css,md}': 'prettier --write',
};
