/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const jestConfig = require('./jest.config.cts');

delete jestConfig.coverageDirectory;
delete jestConfig.coveragePathIgnorePatterns;
delete jestConfig.coverageReporters;
delete jestConfig.testMatch;

module.exports = {
  ...jestConfig,
  verbose: false,
  testMatch: ['<rootDir>/tests_int/*.+(spec|test).[jt]s?(x)'],
};
