const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'production', resolve: {extensions: ['.ts', '.js']},
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
            {
                test: /\.scss$/, include: /index\.scss$/, use: [{loader: MiniCssExtractPlugin.loader},
                    'css-loader', 'sass-loader']
            },
            {
                test: /\.scss$/, exclude: /index\.scss$/, use: ['to-string-loader',
                    'css-loader', 'sass-loader']
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
                use: [{loader: 'file-loader', options: {outputPath: 'fonts/', publicPath: 'fonts/'}}]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin(['dist']), new MiniCssExtractPlugin()
    ]
};