const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlwebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
// const WebpackClean = require('webpack-clean');
const WebpackCleanPlugin = require('webpack-clean-plugin');
// require('dedupe-plugin');
// const nodeExternals = require('webpack-node-externals');

const path = require('path');
const PATHS = {
    app: path.join(__dirname, 'UIComponents/src'),
    build: path.join(__dirname, 'UIComponents/dist'),
    directives: path.join(__dirname, 'UIComponents/src/directives')
};

const TARGET = process.env.npm_lifecycle_event;
const DEBUG = TARGET !== 'componentsProd';
const IS_DEV = TARGET === 'componentsDev';
var entry = {
    '../index': [PATHS.app + '/index.js'],
    'directives': [PATHS.directives + '/index.js'],
    'tooltip': [PATHS.directives + '/tooltip/index.js'],
    'codeMirrorEditor': [PATHS.directives + '/codeMirrorEditor/index.js'],
    'setFocus': [PATHS.directives + '/setFocus.js'],
    'mindmap': [PATHS.directives + '/mindmap/index.js'],
    'resizableLayout': [PATHS.directives + '/resizableLayout/index.js'],
    'tree': [PATHS.directives + '/tree/index.js'],
    'pagination': [PATHS.directives + '/pagination/index.js'],
    'table': [PATHS.directives + '/table/index.js'],
    'treeTable': [PATHS.directives + '/treeTable/index.js'],
    'directedGraph': [PATHS.directives + '/directedGraph/index.js'],
    'compile': [PATHS.directives + '/compile/index.js'],
    'dropdown': [PATHS.directives + '/dropdown/index.js'],
    'autocompletion': [PATHS.directives + '/autocompletion/index.js'],
    'searchField': [PATHS.directives + '/searchField/index.js'],
    'ratingIndicator': [PATHS.directives + '/ratingIndicator/index.js'],
    'accordion': [PATHS.directives + '/accordion/index.js'],
    'tabset': [PATHS.directives + '/tabset/index.js'],
    'simpleJsonDiff': [PATHS.directives + '/simpleJsonDiff/index.js'],
    'copy': [PATHS.directives + '/copy/copy.js'],
    'autotextarea': [PATHS.directives + '/autotextarea/index.js'],
    'carousel': [PATHS.directives + '/carousel/index.js'],
    'dialog': [PATHS.directives + '/dialog/index.js'],
    'button': [PATHS.directives + '/button/index.js'],
    'icon': [PATHS.directives + '/icon/index.js'],
    'switch': [PATHS.directives + '/switch/index.js'],
    'radioButton': [PATHS.directives + '/radioButton/index.js'],
    'checkbox': [PATHS.directives + '/checkbox/index.js'],
    //'d3LayoutTree': [PATHS.directives + '/d3/layoutTree/index.js'],
    'd3DndTree': [PATHS.directives + '/d3/dndTree/index.js']
};
var common = {
    entry: entry,
    output: {
        path: PATHS.build + '/directives',
        // publicPath: PATHS.build,
        //filename: DEBUG ? '[name].js' : '[name].[chunkhash].min.js',
        //chunkFilename: DEBUG ? '[name].js' : '[name].[chunkhash].min.js',
        filename: DEBUG ? '[name].js' : '[name].min.js',
        chunkFilename: DEBUG ? '[name].js' : '[name].min.js'
    },
    externals: {
        angular: 'angular',
        jQuery: 'jquery',
        $: 'jquery'
        // jquery: 'jquery'
    },
    module: {
        noParse: ['angular', 'jquery', '$', 'iconfont.js'],
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
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg)(\?t=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=1000000'
            },
            {
                test: /\.js$/,
                exclude: /node_modules|iconfont/,
                loaders: ['ng-annotate', 'babel-loader']
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
            // template: require('html-webpack-template'),
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
            window: null,
            //chunks: ['directives', '../index']
            chunks: Object.keys(entry)
            // css: ['css/style.css']
        }),
        new TransferWebpackPlugin([
            {from: path.join(PATHS.app, '/vendor'), to: '../vendor'}
        ], path.resolve(path.join(PATHS.build)))
    ]
};

const devServerPort = 8887;
if (IS_DEV) {
    console.log('============', IS_DEV, devServerPort, '========');
    // require('./test/dist/index.html');
    common.entry['../index'].unshift('webpack-dev-server/client?http://localhost:' + devServerPort + '/', 'webpack/hot/dev-server');
    common = merge(common, {
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            disableHostCheck: true,
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
     common.plugins.push(new webpack.optimize.UglifyJsPlugin({
         compress: {
             // supresses warnings, usually from module minification
             warnings: false
         }
     }));
}

module.exports = common;
