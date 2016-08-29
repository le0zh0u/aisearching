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
            }
        ]
    }
};