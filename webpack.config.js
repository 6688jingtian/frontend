const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlwebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const WebpackCleanPlugin = require('webpack-clean-plugin');
const HappyPack = require('happypack');
const os = require('os');
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

var Visualizer = require('webpack-visualizer-plugin');

const path = require('path');
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

const TARGET = process.env.npm_lifecycle_event;
const DEBUG = TARGET !== 'prod';
const IS_DEV = TARGET === 'dev';
var common = {
	entry: {
		app: [path.join(PATHS.app, '/app.js')],
		index: [path.join(PATHS.app, '/features/index/index.controller')],
		framework: [path.join(PATHS.app, '/features/framework/framework.controller')],
		templates: [path.join(PATHS.app, '/features/templates/templates.controller')]
	},
    output: {
	    path: PATHS.build,
	    // publicPath: PATHS.build,
	    filename: DEBUG ? '[name].js' : '[name].[chunkhash].min.js',
	    chunkFilename: DEBUG ? '[name].js' : '[name].[chunkhash].min.js'
	},
    module: {
        noParse: [PATHS.app + '/direcitves/icon/iconfont/iconfont.js'],
    	loaders: [
    		// LESS
		    {
		        test: /\.less$/,
		        loader: 'style!css!less',
		        // loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
		    },
	    	{
		        // Test expects a RegExp! Note the slashes!
		        test: /\.css$/,
		        loaders: ['style', 'css'],
		        // Include accepts either a path or an array of paths.
		        // include: PATHS.app
		    },
		    {
		    	test: /\.(png|woff|woff2|eot|ttf|svg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		    	loader: 'url-loader?limit=100000'
		    },
		    {
	    		test: /\.js$/,
				exclude: /node_modules|iconfont/,
                // loaders: ['ng-annotate', 'babel-loader'],
                loader: 'happypack/loader?id=happybabel'
	    	},
	    	{
		        // HTML LOADER
		        // Reference: https://github.com/webpack/raw-loader
		        // Allow loading html through js
		        test: /\.html$/,
		        loader: 'raw-loader'
		    }
    	]
    },
    plugins: [
	    new HtmlwebpackPlugin({
	    	// required
	    	inject: false,
	      	template: path.join(PATHS.app, '/index.ejs'),
	      	
	      	// optional
	      	// appMountId: 'app',
	      	// baseHref: 'http://localhost:8080',
	      	// devServer: 3080,
	      	googleAnalytics: {
	      		trackingId: 'UA-XXXX-XX',
	      		pageViewOnLoad: true
	      	},
	      	filename: path.join(PATHS.build, '/index.html'),
	      	mobile: true,
	      	title: 'Angular1.x with ES6',
	      	window: {},
	      	chunks: ['common', 'app'],
	      	// css: ['css/style.css']
	    }),
	    // new webpack.optimize.CommonsChunkPlugin('vendors', DEBUG ? 'vendors.js' : 'vendors.[hash].js'),
	    // new webpack.optimize.CommonsChunkPlugin('jquery', DEBUG ? 'jquery.js' : 'jquery.[hash].js'),
	    new webpack.optimize.CommonsChunkPlugin({
	        name: 'common',
	        chunks: ['app', 'index', 'framework',  'components', 'templates'],
	        minChunks: 2
	    }),
	    // new webpack.optimize.CommonsChunkPlugin({
	    //   names: [ 'jquery', 'vendors']
	    // }),
	    // new webpack.optimize.UglifyJsPlugin({
	    //            sourceMap: true,
	    //            mangle: false
	    // }),
	    // new ExtractTextPlugin('./css/[name].css'),
	    // new ExtractTextPlugin('./css/style.css'),
	    new webpack.ProvidePlugin({
	      $: "jquery",
	      jQuery: "jquery",
	      "window.jQuery": "jquery"
	    }),
        new HappyPack({
            id: 'happybabel',
            loaders: ['ng-annotate', 'babel-loader'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
    	new webpack.optimize.DedupePlugin(),
	    //new AssetsPlugin({
	    //	prettyPrint: true
	    //}),
	    new TransferWebpackPlugin([
	    	{from: path.join(PATHS.app, '/style'), to: '/style'},
	    	{from: path.join(PATHS.app, '/img'), to: '/img'}
    	], path.resolve(path.join(PATHS.build))),
        //new Visualizer({
        //    filename: './statistics.html'
        //})
    ]
};

const devServerPort = 8886;
if (IS_DEV) {
	require('./mockserver/server');
	common.entry.app.unshift('webpack-dev-server/client?http://localhost:' + devServerPort + '/', 'webpack/hot/dev-server');
	common = merge(common, {
		devServer: {
			contentBase: PATHS.build,
			disableHostCheck: true,
			historyApiFallback: true,
		    hot: true,
		    inline: false,
		    progress: true,
		    // Display only errors to reduce the amount of output.
      		stats: 'errors-only',

      		// Parse host and port from env so this is easy to customize.
      		host: process.env.HOST,
      		port: devServerPort //devServerPort //process.env.PORT
		},
		devtools: 'eval-source-map',
		devtool: 'inline-source-map',
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
}

if (!DEBUG) {
	console.log('compress');

	//压缩打包的文件
	// common.plugins.push(new webpack.optimize.UglifyJsPlugin({
 //        compress: {
 //            // supresses warnings, usually from module minification
 //            warnings: false
 //        }
 //    }));

    const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
    common.plugins.push(new UglifyJsParallelPlugin({
        workers: os.cpus().length,
        mangle: true,
        compressor: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
        }
    }));

    common.plugins.unshift(
	   	new WebpackCleanPlugin({
            on: 'emit',
            path: [PATHS.build]
        })
    );
}

module.exports = common;
