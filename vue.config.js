const isBuild = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: '/',
  assetsDir: 'static/',
  crossorigin: 'anonymous',

  productionSourceMap: !isBuild,

  css: {
    sourceMap: !isBuild,
    loaderOptions: {
      sass: {
        // eslint-disable-next-line
        prependData: `@import '@/scss/abstracts/_abstracts.scss';`,
      },
    },
  },

  devServer: {
    open: true,
  },

  // pluginOptions: {
  //   lintStyleOnBuild: true,
  // },

  configureWebpack: config => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    });
    // config.plugins = config.plugins.concat([
    //   new StyleLintPlugin({
    //     fix: false,
    //     files: ['src/**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    //   }),
    // ])
  },

  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');

    config.module
      .rule('sideEffects')
      .resourceQuery(/keep/)
      .sideEffects(true);

    config.module
      .rule('sass')
      .oneOf('normal')
      .use('sass-loader')
      .tap(options => {
        delete options.data;
        return options;
      });
  },
};
