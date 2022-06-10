const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin') //gzip 压缩
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') //包体积分析

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') //打包耗时分析
// const smp = new SpeedMeasurePlugin({
//   outputFormat: 'human',
// })

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const resolve = (dir) => path.join(__dirname, dir)

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
}

const cdn = {
  dev: {
    css: [],
    js: [],
  },
  build: {
    css: [],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
    ],
  },
}

module.exports = {
  publicPath: IS_PROD ? '/www/' : '/', //公共路径
  outputDir: 'dist', //打包输出目录
  productionSourceMap: !IS_PROD, //生产环境的 source map
  parallel: require('os').cpus().length > 1, //是否为 Babel 或 TypeScript 使用 thread-loader
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/styles/variables.scss')],
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.11.11.11:7071',
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
      '/api2': {
        target: 'http://172.12.12.12:2018',
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          '^/api2': '/',
        },
      },
    },
  },
  chainWebpack: (config) => {
    // 移除 prefetch 插件(Prefetch 链接将会消耗带宽。如果你的应用很大且有很多 async chunk,可能需要关掉 prefetch 链接并手动选择要提前获取的代码区块。)
    //import(/* webpackPrefetch: true */ './someAsyncComponent.vue')
    config.plugins.delete('prefetch')

    config.module.rule('images').set('parser', {
      dataUrlCondition: {
        maxSize: 4 * 1024,
      },
    })

    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
    //压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 },
      })

    if (IS_PROD) {
      config.plugin('html').tap((args) => {
        args[0].cdn = IS_PROD ? cdn.build : cdn.dev
        return args
      })
    }
  },
  configureWebpack: (config) => {
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        }),
      )
      config.externals = externals
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  // configureWebpack: smp.wrap({
  //   plugins: [
  //     // new BundleAnalyzerPlugin()
  //   ],
  // }),
}
