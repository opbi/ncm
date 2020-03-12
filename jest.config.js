module.exports = {
  modulePaths: ['node_modules', './src'],
  testPathIgnorePatterns: [
    'node_modules',
    'dist',
    'types',
    '/__fixtures__/',
    '__tests__/helpers',
  ],
  testEnvironment: 'node',
};
