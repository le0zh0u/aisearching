var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: {
        public: './public/src/index'
    },
    output: {
        path: path.join(__dirname, 'public/dist'),
        filename: 'bundle.js',
        publicPath: 'public/dist'
    },
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [path.join(__dirname, 'public/src')],
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=10000&name=build/[name].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss']
    },
};