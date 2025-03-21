/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};
