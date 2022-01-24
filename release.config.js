module.exports = {
  'branches': ['main'],
  'plugins': [
    ['@semantic-release/commit-analyzer', {
      'preset': 'angular',
      'releaseRules': [
        {'type': 'breaking', 'release': 'major'}
      ],
      'parserOpts': {
        'noteKeywords': ['BREAKING CHANGE', 'BREAKING CHANGES']
      }
    }],
    ['@semantic-release/release-notes-generator'],
    ['@semantic-release/changelog', {
      'changelogFile': 'docs/CHANGELOG.md'
    }],
    ['@semantic-release/npm'],
    ['@semantic-release/git', {
      'assets': ['docs', 'package.json', 'package-lock.json', 'badges', 'badges/*'],
      'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }]
  ]
};
