module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '<rootDir>/src/__mocks__/before.mock.ts',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@Application/(.*)': '<rootDir>/src/application/$1',
    '@Components/(.*)': '<rootDir>/src/components/$1',
    '@Config/(.*)': '<rootDir>/src/config/$1',
    '@Domain/(.*)': '<rootDir>/src/domain/$1',
    '@Enums/(.*)': '<rootDir>/src/enums/$1',
    '@Interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '@Lib/(.*)': '<rootDir>/src/lib/$1',
    '@Pages/(.*)': '<rootDir>/src/pages/$1',
    '@Styles/(.*)': '<rootDir>/src/styles/$1',
    '@Services/(.*)': '<rootDir>/src/services/$1',
    '@Types/(.*)': '<rootDir>/src/types/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
  },
};
