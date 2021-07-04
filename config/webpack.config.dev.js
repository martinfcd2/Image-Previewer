const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共的配置

const devConfig = {
  entry: './demo/demo.js', // 入口文件
  mode: 'development', // 打包为开发模式
  output: {
    filename: 'demo.bundle.js', // 输出的文件名称
    path: path.resolve(__dirname, '../demo') // 输出的文件目录
  },
  devServer: {
    contentBase: path.join(__dirname, '../demo'),
    compress: true, // 是否启用 gzip 压缩
    port: 9000,
    open: true, // 自动打开浏览器
    hot: true // 热更新
  },
  module: {
    rules: [
      { // 编译less
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
}

module.exports = merge(devConfig, baseConfig);
