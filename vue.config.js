module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/mariendael-kunstquiz/'
    : '/',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Mariëndael Kunstquiz';
      args[0].meta = {
        viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      };
      return args;
    });
  },
};
