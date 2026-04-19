/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const uConfig = require('./jest.config.cts');

delete uConfig.coverageDirectory;
delete uConfig.coveragePathIgnorePatterns;
delete uConfig.coverageReporters;
delete uConfig.testMatch;

module.exports = {
  ...uConfig,
  maxWorkers: 1,
  verbose: false,
  testMatch: ['<rootDir>/tests_bench/*.+(spec|test).[jt]s?(x)'],
};
