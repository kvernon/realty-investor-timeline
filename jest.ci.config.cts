/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const uConfig = require('./jest.config.cts');

module.exports = {
  ...uConfig,
  testResultsProcessor: 'jest-junit',
  reporters: ['default', 'jest-junit'],
};
