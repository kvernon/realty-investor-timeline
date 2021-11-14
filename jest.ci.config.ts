/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const uConfig = require('./jest.config').default;

export default {
  ...uConfig,
  testResultsProcessor: 'jest-junit',
  reporters: ['default', 'jest-junit'],
};
