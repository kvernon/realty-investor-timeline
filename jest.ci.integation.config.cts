/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const config = require('./jest.integation.config.cts');

module.exports = {
  ...config,
  testResultsProcessor: 'jest-junit',
  reporters: ['default', 'jest-junit'],
};
