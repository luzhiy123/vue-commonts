const path = require("path");
const merge = require("webpack-merge");
const webpackLibBaseConfig = require("./webpack.lib.base.js");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");

module.exports = merge(webpackLibBaseConfig, {
    mode: "production",
    devtool: "source-map",
    entry: {
        "hztl-ui": path.resolve(__dirname, "../src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "../lib"),
        filename: "index.js",
        publicPath: "/",
        library: "hztl-ui",
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
                        loader: miniCssExtractPlugin.loader,
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
            filename: "index.css"
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
