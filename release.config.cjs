/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: [
    'main',
    { 'name': 'develop', 'channel': 'next', 'prerelease': 'rc' },
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          {
            type: 'docs',
            release: 'patch',
          },
          {
            type: 'feat',
            release: 'minor',
          },
          {
            type: 'chore',
            release: 'patch',
          },
          {
            message: '**',
            release: 'patch',
          },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],
  ],
};
