const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// mini-css-extract-plugin用于将组件的css打包成单独的文件输出,此处样式较少，不拆分css文件了，不然组件样式要单独引入，很不方便
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

const devConfig = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js', // 输出文件
    libraryTarget: 'umd', // 采用通用模块定义, 注意webpack到4.0为止依然不提供输出es module的方法，所以输出的结果必须使用npm安装到node_modules里再用，不然会报错
    library: 'image-previewer', // 库名称
    libraryExport: 'default', // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: [
        // MiniCssExtractPlugin.loader,
        "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
            sourceMap: false
          }
        }
      ]
    }
    ]
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "main.min.css" // 提取后的css的文件名
  //   })
  // ],
}

module.exports = merge(devConfig, baseConfig);
