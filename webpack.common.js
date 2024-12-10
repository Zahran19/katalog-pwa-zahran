const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    // sw: path.resolve(__dirname, 'src/scripts/sw.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // Berlaku untuk semua jenis chunks
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // Semua library dari node_modules
          name: 'vendors', // Output file untuk vendor
          chunks: 'all', // Terapkan pada semua chunks
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/, // Rule for SASS/SCSS files
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader', // Transforms CSS into JS
          'sass-loader', // Compiles SASS to CSS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            // CopyWebpackPlugin mengabaikan berkas yang berada di dalam folder images
            ignore: ['**/images/**'],
          },
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js', // Output file name for the service worker
      runtimeCaching: [
        {
          urlPattern: ({ url }) =>
            url.href.startsWith('https://restaurant-api.dicoding.dev/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'therestaurant-api',
          },
        },
        {
          urlPattern: ({ url }) =>
            url.href.startsWith(
              'https://restaurant-api.dicoding.dev/images/medium/'
            ),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'therestaurant-image-api',
          },
        },
      ],
    }),
    new ImageminWebpackPlugin({
      apply: (compiler) => {
        compiler.hooks.compilation.tap(
          'ImageminWebpackPlugin',
          (compilation) => {
            compilation.hooks.processAssets.tap(
              {
                name: 'ImageminWebpackPlugin',
                stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
              },
              (assets) => {
                Object.keys(assets).forEach((asset) => {
                  if (
                    asset.endsWith('.jpg') ||
                    asset.endsWith('.jpeg') ||
                    asset.endsWith('.png')
                  ) {
                    if (assets[asset].size() > 200 * 1024) {
                      assets[asset] = ImageminMozjpeg({
                        quality: 50,
                        progressive: true,
                      }).process(assets[asset]);
                    }
                  }
                });
              }
            );
          }
        );
      },
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // Jalankan server lokal
      analyzerHost: 'localhost', // Host server
      analyzerPort: 8888, // Port server
      openAnalyzer: true, // Otomatis membuka browser
    }),
  ],
};