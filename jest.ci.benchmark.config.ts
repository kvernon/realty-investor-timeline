/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
import benchConfig from './jest.benchmark.config';

export default {
  ...benchConfig,
  testResultsProcessor: 'jest-junit',
  reporters: ['default', 'jest-junit'],
};
