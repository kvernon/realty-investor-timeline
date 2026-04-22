/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const benchConfig = require('./jest.benchmark.config.cts');

module.exports = {
  ...benchConfig,
  testResultsProcessor: 'jest-junit',
  reporters: ['default', 'jest-junit'],
};
