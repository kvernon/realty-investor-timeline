module.exports = {
  'branches': ['main'],
  'plugins': [
    '@semantic-release/commit-analyzer',
    ['@semantic-release/release-notes-generator'],
    ['@semantic-release/changelog', {
      'changelogFile': 'docs/CHANGELOG.md'
    }],
    ['@semantic-release/npm'],
    ['@semantic-release/git', {
      'assets': ['docs', 'package.json', 'package-lock.json', 'badges'],
      'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }]
  ]
};
