module.exports = {
  modulePaths: ['node_modules', './src'],
  testPathIgnorePatterns: [
    'node_modules',
    '/__fixtures__/',
    '__tests__/helpers',
  ],
  testEnvironment: 'node',
};
