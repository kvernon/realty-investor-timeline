/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
import config from './jest.integation.config';

export default {
  ...config,
  testResultsProcessor: 'jest-junit',
  reporters: ['default', 'jest-junit'],
};
