process.env.TZ = 'GMT';

module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/coverage/**',
    '!**/scripts/**'
  ],
  coverageDirectory: './coverage',
  modulePaths: ['./'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.{test,spec}.ts'],
};
