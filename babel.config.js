module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12.18',
        },
      },
    ],
    '@babel/typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    ['module-resolver', { root: ['./src'] }],
  ],
};
