const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {extensions: ['.ts', '.js']},
    module: {
        rules: [
            {test: /\.ts$/, use: {loader: 'ts-loader', options: {transpileOnly: true}}},
            {
                test: /\.scss$/, include: /index\.scss/, use: ['style-loader',
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}}]
            },
            {
                test: /\.scss$/, exclude: /index\.scss$/, use: ['to-string-loader',
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}}]
            },
            {
                test: /\.css$/, include: /index\.css$/, use: ['style-loader',
                    {loader: 'css-loader', options: {sourceMap: true}},]
            },
            {
                test: /\.css$/, exclude: /index\.css$/, use: ['to-string-loader',
                    {loader: 'css-loader', options: {sourceMap: true}},]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader', options: {}
                }]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: './src/index.html'})]
};

