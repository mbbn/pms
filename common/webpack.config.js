const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

var devModeUsername = 'root';
var devModePassword = 'root';
var devModeJavaServerIp = '127.0.0.1';
var devModeJavaServerPort = '8080';

module.exports = (env, argv) => ({
    entry: [
        './src/main/ts/index.tsx'
        /* Uncomment for custom js import with 'require':
        './src/main/ts/public/custom.js'
         */
    ],
    output: {
        filename: argv.mode === 'development' ? 'bundle.js' : 'dist/[chunkhash].[name].bundle.js',
        path: __dirname + '/../' + env.projectDir + '/build/webpack'
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: { // It is an alternative to TsConfigPathsPlugin (for not depending to another library):
            "@common": path.resolve("../common/src/main/ts")
        }
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            plugins: argv.mode === 'development' ? [
                                'react-refresh/babel'
                                /*, '@babel/plugin-syntax-dynamic-import'*/ // Dynamic imports does not work properly with react-hot-loader.
                            ] : [
                                '@babel/plugin-syntax-dynamic-import' // Support dynamic import for React.lazy() in ViewName.
                            ],
                        },
                    },
                    'ts-loader', // (or awesome-typescript-loader)
                ]
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
                test: /\.(png|jpg|gif|webp)$/i,
                type: 'assets/'
            }
        ]
    },

    plugins: [
        argv.mode === 'development' ? new webpack.HotModuleReplacementPlugin() : null,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(argv.mode), // argv.mode values: 'development', 'production'
            'process.env.devModeUsername': JSON.stringify(devModeUsername),
            'process.env.devModePassword': JSON.stringify(devModePassword),
            'process.env.devModeJavaServerIp': JSON.stringify(devModeJavaServerIp),
            'process.env.devModeJavaServerPort': JSON.stringify(devModeJavaServerPort)
        }),
        new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', //Name of file in ./dist/
            template: '../common/src/main/webapp/index.html', //Name of template in ./src/main/webapp
            chunksSortMode: 'none', // Disabled in order to work with dynamic imports() (lazy loading)
            // title: 'گروه صنعتی کاراکابین',
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
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/main/resources/static/img", to: "img" },
                { from: "src/main/resources/static/fav", to: "favicons" },
                { from: "src/main/resources/static/html", to: "html" },
                /*{from: './src/main/webapp'},*/
                /*{from: '../common/src/main/webapp'}*/
            ]
        },
            {ignore: ['WEB-INF/**/*', 'META-INF/!**!/!*', 'error/!**/!*', '*.jsp']}
        ),
    ].filter(plugin => plugin != null),

    ...getSpecialParams(argv.mode),

    mode: argv.mode,
});

function getSpecialParams(mode) {
    if (mode === 'development') {
        return {
            // https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
            devServer: {
                static: path.join(__dirname, 'dist'),
                compress: false,
                hot: true, // HotModuleReplacement
                open: true, // Opens browser
                host: '127.0.0.1',
                port: 4000,
                historyApiFallback: true // If page not found, loads index.html.
            },

            // Enable source-map for debugging webpack's output.
            devtool: 'cheap-module-source-map'
        }
    } else {
        return {
            optimization: {
                minimizer: [
                    new CssMinimizerPlugin(),
                    new TerserWebpackPlugin({
                    terserOptions: {
                        keep_fnames: true,
                        output: {
                            comments: false // Remove copy right comments to reduce size.
                        }
                    }
                })
                ],
                splitChunks: {
                    cacheGroups: { // Put all node_modules libraries in '*.vendor.js'
                        commons: {
                            test: /[\\/]node_modules/,
                            name: 'vendors',
                            chunks: 'all',
                        }
                    }
                }
            }
        };
    }
}