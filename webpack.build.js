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
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"production"'}}),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: false
            },
            comments: false
        })
    ],

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'react', 'stage-0'],
                plugins: [
                    'lodash',
                    'transform-decorators-legacy',
                    'transform-runtime'
                ]
            }
        }]
    }

};
