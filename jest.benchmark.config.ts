/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const uConfig = require('./jest.config').default;

delete uConfig.coverageDirectory;
delete uConfig.coveragePathIgnorePatterns;
delete uConfig.coverageReporters;
delete uConfig.testMatch;

export default {
  ...uConfig,
  maxWorkers: 1,
  verbose: false,
  testMatch: ['<rootDir>/tests_bench/*.+(spec|test).[jt]s?(x)'],
};
