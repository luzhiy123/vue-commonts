const webpack = require("webpack");
const webpackCommonConfig = require("./webpack.config.js");
const merge = require("webpack-merge");

module.exports = merge(webpackCommonConfig, {
    // 指定模式，这儿有none production development三个参数可选
    // 具体作用请查阅官方文档
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader", // 开发环境还是使用style-loader，不然无法及时响应样式变化
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("dart-sass")
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.(js|vue)$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    formatter: require("eslint-friendly-formatter")
                }
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        host: "0.0.0.0",
        hot: true,
        port: 9200,
        contentBase: "./dist",
        clientLogLevel: "error", // 关闭在浏览器控制台显示消息的功能，可能的值有 none, error, warning 或者 info（默认值）。这里我设置为只显示错误消息
        overlay: {
            errors: true,
            warnings: true
        }
    }
});