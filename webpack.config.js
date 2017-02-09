const webpack = require('webpack');

module.exports = {

    cache: false,

    entry: './src/index.js',
    output: {
        library: 'react-modal-dialog',
        libraryTarget: 'umd'
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        },
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom'
        }
    },
    plugins: [
        //new webpack.LoaderOptionsPlugin({
        //    minimize: true,
        //    debug: false
        //}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })//,
        //new webpack.optimize.AggressiveMergingPlugin(),
        //new webpack.optimize.UglifyJsPlugin({
        //    beautify: false,
        //    mangle: {
        //        screw_ie8: true,
        //        keep_fnames: true
        //    },
        //    compress: {
        //        screw_ie8: true,
        //        warnings: false
        //    },
        //    comments: false
        //})
    ],

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }

};
