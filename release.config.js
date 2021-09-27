module.exports = {
  'branches': ['main'],
  'plugins': [
    '@semantic-release/commit-analyzer',
    '@semantic-release/github',
    ['@semantic-release/release-notes-generator'],
    ['@semantic-release/npm']
  ],
  'debug': true
};
