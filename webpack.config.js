const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  // 打包模式 production 压缩/development 不压缩
  mode: 'development',
  // entry: 配置入口文件 (从哪个文件开始打包)
  entry: './src/main.js',
  // output: 配置输出 (打包到哪去)
  output: {
    // 打包输出的目录 (必须是绝对路径)
    path: path.join(__dirname, 'dist'),
    // 打包生成的文件名
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    port: 8080, // 端口号
    open: true, // 自动打开浏览器
    hot: true   // 开启热更新
  },
  module: {
    rules: [
      {
         test: /\.(htm|html)$/,
         use: [
           'raw-loader'
         ]
      }
    ]
  }
}