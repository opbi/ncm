module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10.19',
        },
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    ['module-resolver', { root: ['./src'] }],
  ],
};
