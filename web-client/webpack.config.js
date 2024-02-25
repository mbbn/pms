const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = function (_env, argv){
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    return {
        devtool: isDevelopment && "cheap-module-source-map",
        entry: './src/index.tsx',
        mode: isProduction ? 'production' :'development',
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    type: 'assets'
                },
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash:8].js',
            publicPath: "/"
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'our project',
                template: 'src/index.html',
                hash: false,
                minify: true,
                inject: 'body',
                scriptLoading: "defer",
                meta:[
                    {'charset':'UTF-8'},
                    {'http-equiv':'X-UA-Compatible', 'content':'IE=edge'},
                    {'name':'viewport', 'content':'width=device-width, initial-scale=1.0'}
                ],
            }),
            new MiniCssExtractPlugin({
                filename: "bundle.css"
            }),
            new CopyPlugin({
                patterns: [
                    { from: "src/assets/img", to: "img" }
                ]
            }),
        ],
        devServer: {
            static: path.join(__dirname, 'dist'),
            compress: true,
            port: 4000,
        },
    };
}