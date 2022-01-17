module.exports = {
  color: true,
  diff: true,
  ignore: ['node_modules'],
  package: './package.json',
  parallel: true,
  reporter: 'spec',
  spec: ['**/*.test.mjs'],
  timeout: 2000
};
