import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'development',
    entry: './front/src/index.js',
    output: {
        path: resolve(__dirname, './front/dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, './front/dist/index.html'),
            filename: 'index.html',
            minify: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                //sass-loader & sass
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    // devtool: 'source-map',
    // resolve: {
    //     extensions: ['.tsx', '.ts', '.js'],
    // },
    devServer: {
        compress: true,
        port: 4200,
        liveReload: true,
        hot: false,
    },
};
