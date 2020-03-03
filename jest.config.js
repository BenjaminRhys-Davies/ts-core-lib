process.env.TZ = 'GMT';

module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.{mock,test}.{js,ts}',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/coverage/**',
    '!**/scripts/**'
  ],
  coverageDirectory: './coverage',
  modulePaths: ['./'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.{test,spec}.ts'],
};
