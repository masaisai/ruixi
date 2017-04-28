var webpack = require('webpack');
var path= require("path");
var HtmlWebpackPlugin=require('html-webpack-plugin');
var importsLoader=require('imports-loader');
var exportsLoader=require('exports-loader');
// 引入css 单独打包插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 设置生成css 的路径和文件名，会自动将对应entry入口js文件中引入的CSS抽出成单独的文件
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    
    //页面入口文件配置
    entry:{
    base:[
    	'./pcweb/src/js/jquery.min.js',
    	'./pcweb/src/js/canvas-particle.js',
    	'./pcweb/src/js/moveto.js',
    	'./pcweb/src/js/common.js',
		'./pcweb/src/js/modernizr.js',
		'./pcweb/src/js/css.js'
    ]
    },
    //入口文件输出配置
    output: {
        path: __dirname+'/pcweb/dist/js',
        filename: '[name].js'
    },
    module: {
        rules:[{test: /modernizr/, loader: 'imports-loader?this=>window!exports-loader?window.Modernizr'},
            { test: /\.css$/, use: ExtractTextPlugin.extract([ 'css-loader']) },
            {test: /\.(jpe?g|png|gif)$/, exclude: /(node_modules)/,loader: 'url-loader?limit=10000&name=../img/[hash:8].[name].[ext]'},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: 'url-loader?limit=10000&minetype=application/font-woff'}, 
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader'}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
     // 最紧凑的输出
    beautify: false,
    // 删除所有的注释
    comments: false,
    compress: {
      // 在UglifyJs删除没有用到的代码时不输出警告  
      warnings: false,
      // 删除所有的 `console` 语句
      // 还可以兼容ie浏览器
      drop_console: true,
      // 内嵌定义了但是只用到一次的变量
      collapse_vars: true,
      // 提取出出现多次但是没有定义成变量去引用的静态值
      reduce_vars: true,
    }
}),
 new ExtractTextPlugin('../css/styles.css'),
  new OptimizeCSSPlugin(),
 new HtmlWebpackPlugin()
    ]

};