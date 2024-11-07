module.exports = {
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
        alias: {
          '@': './src',
        },
      },
    },
  },
};
