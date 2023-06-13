import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'development',
    devServer: {
        compress: true,
        port: 5500,
        liveReload: true,
        hot: false,
    },
    entry: './front/src/index.js',
    output: {
        path: resolve(__dirname, 'front/dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
        assetModuleFilename: 'assets/[name][ext]',
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, './front/src/index.html'),
            filename: 'index.html',
            minify: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
    },
};
