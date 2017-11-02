
const path = require('path');

module.exports = {
    entry: {
        components: [],
    },
    output: {
        path: path.join(__dirname, '/temp'),
        filename: '[name].min.js',
        chunkFilename: '[name].min.js'
    },
    externals: {

    },
    module: {
        noParse: ['angular', 'jquery', '$'],
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
        //new webpack.optimize.UglifyJsPlugin()
    ]
};