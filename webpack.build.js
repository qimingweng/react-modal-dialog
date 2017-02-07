const webpack = require('webpack');

module.exports = {

    cache: false,

    entry: './src/index.js',
    output: {
        path: 'lib/',
        publicPath: '/',
        filename: 'index.js'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"production"'}}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
                presets: ['react', 'stage-0'],
                plugins: [
                    'lodash',
                    'transform-decorators-legacy',
                    'transform-runtime'
                ]
            }
        }]
    }

};
