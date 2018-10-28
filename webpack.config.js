const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    watch: true,

    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },

    entry: {
        test: './public/typescripts/test.ts',

        main: './public/scss/main.scss',
        frontPage: './public/scss/pages/frontPage.scss'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, './public/dist')
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
            chunkFilename: '[id].min.css'
        })
    ],

    optimization: {
        minimize: true,

        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};
