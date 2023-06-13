import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'development',
    devServer: {
        compress: true,
        port: 4200,
        liveReload: true,
        hot: false,
    },
    entry: './front/src/index.js',
    output: {
        path: resolve(__dirname, 'front/dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, './front/src/index.html'),
            filename: 'index.html',
            minify: true,
        }),
        new CopyPlugin({
            patterns: [{ from: resolve(__dirname, 'front/src/image'), to: resolve(__dirname, 'front/dist/assets') }],
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
