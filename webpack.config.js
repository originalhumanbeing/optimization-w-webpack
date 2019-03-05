const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// mode를 인자로 받지 않을 때 기본 설정: mode별로 config파일 따로 만들고 콜
// module.exports = {
//     entry: {
//         app: ['./src/index.js']
//     },
//     output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     }
// };

// mode를 cli에서 인자로 전달해줄 때
module.exports = (env, options) => {
    const config = {
        entry: {
            app: ['./src/index.js']
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        plugins: [
            new CleanWebpackPlugin(['dist'])
        ]
    };

    if(options.mode === 'development') {
        config.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: 'Development',
                showErrors: true
            })
        ];

        config.devtool = 'inline-source-map';

        config.devServer = {
            hot: true,
            host: '0.0.0.0',
            contentBase: './dist',
            status: {
                color: true
            }
        };
    } else {
        // ...production config
    }

    return config;
};
