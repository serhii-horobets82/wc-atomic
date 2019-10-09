const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './source/index.ts',
        polyfills: './source/polyfills.ts',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    performance: {
        maxEntrypointSize: 700000,
        maxAssetSize: 800000
    },
    mode: 'production', resolve: {extensions: ['.ts', '.js']},
    module: {
        rules: [
            {
                test: /\.(t|j)s$/, use: 'ts-loader', include: [
                    path.resolve(__dirname, 'node_modules/lit-element'),
                    path.resolve(__dirname, 'node_modules/lit-html'),
                    path.resolve(__dirname, 'node_modules/pwa-helpers'),
                    path.resolve(__dirname, 'source')
                ]
            },
            {
                test: /\.scss$/, include: /index\.scss$/, use: [{loader: MiniCssExtractPlugin.loader},
                    'css-loader', 'sass-loader']
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/, /index\.scss$/],
                use: ['to-string-loader',
                    'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/, include: /index\.css$/, use: ['style-loader',
                    {loader: 'css-loader', options: {}},]
            },
            {
                test: /\.css$/, exclude: /index\.css$/, use: ['to-string-loader',
                    {loader: 'css-loader', options: {}},]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{loader: 'file-loader', options: {outputPath: 'fonts/', publicPath: 'fonts/'}}]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './source/index.html'}),
        new CleanWebpackPlugin(['dist']), new MiniCssExtractPlugin()
    ]
};

