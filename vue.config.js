const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 路径根据具体需求更改
        path.resolve(__dirname, 'src/styles/variables.scss'),
      ],
    },
  },
}
