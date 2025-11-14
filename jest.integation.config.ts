/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestConfig = require('./jest.config').default;

delete jestConfig.coverageDirectory;
delete jestConfig.coveragePathIgnorePatterns;
delete jestConfig.coverageReporters;
delete jestConfig.testMatch;

export default {
  ...jestConfig,
  verbose: false,
  testMatch: ['<rootDir>/tests_int/*.+(spec|test).[jt]s?(x)'],
};
