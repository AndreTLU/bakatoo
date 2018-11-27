const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const BUILD_DIR = path.resolve(__dirname, './dist');
const SRC_DIR = path.resolve(__dirname, './src');
const themeVars = path.join(
  __dirname,
  './src/antd-theme-overrides.less',
);
const themeVariables = lessToJs(fs.readFileSync(themeVars, 'utf8'));

console.log('Running webpack server');

const plugins = [
	new HtmlWebpackPlugin({
		template: SRC_DIR + '/index.html',
	})
];

const rules = [
	{
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env', '@babel/preset-react'],
				plugins: [
					['import', { libraryName: 'antd', style: true}]
				]
}
		}
	},
	{
		test: /\.css$/,
		use: { loader: 'css-loader' }
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
      { loader: 'css-loader', options: { importLoaders: 1 } },
      {
        loader: 'less-loader',
        options: { javascriptEnabled: true, modifyVars: themeVariables },
      },
    ],
  }
];

module.exports = {
  devtool: 'source-map',
  mode: 'development',
	stats: 'normal',
	entry: {
		app: [SRC_DIR + '/index.js']
	},
	plugins: plugins,
	module: {
		rules
	},
	output: {
		path: BUILD_DIR,
		publicPath: '/',
		filename: 'js/[name].js',
		chunkFilename: '[chunkhash].js'
	},
	devServer: {
		//host: 'andrep.me',
		port: 3446, // preferred port
		contentBase: BUILD_DIR,
		compress: true,
		historyApiFallback: {
      disableDotRule: true
    },
		hot: true,
		inline: true,
		noInfo: true,
		watchOptions: { poll: true },
		//proxy: { '/api': 'http://localhost:8080'}
	}
}