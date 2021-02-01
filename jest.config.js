module.exports = {
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  // we need to create this file
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(scss|css|jpg|png|gif)$': '<rootDir>/tests/file.mock.js',
  },
};
// module.exports = {
//   testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
//   setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
//   }
// };
