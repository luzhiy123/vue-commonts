const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");
const merge = require("webpack-merge");
const webpackLibBaseConfig = require("./webpack.lib.base.js");
const entry = require("../components.json");

module.exports = merge(webpackLibBaseConfig, {
    mode: "production",
    devtool: "#source-map",
    entry,
    output: {
        path: path.resolve(__dirname, "../lib/packages"),
        filename: "[name]/index.js",
        publicPath: "/",
        library: "[name]",
        libraryTarget: "umd",
        libraryExport: "default",
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader, // 使用miniCssExtractPlugin.loader代替style-loader
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
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "[name]/style.css"
        }),
        new optimizeCssnanoPlugin({
            sourceMap: true,
            cssnanoOptions: {
                preset: ["default", {
                    discardComments: {
                        removeAll: true,
                    },
                }],
            },
        }),
    ]
})
