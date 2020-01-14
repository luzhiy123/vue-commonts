const path = require("path");
const merge = require("webpack-merge");
const webpackLibBaseConfig = require("./webpack.base.js");
const components = require("../components.json");

module.exports = merge(webpackLibBaseConfig, {
    mode: "production",
    devtool: "#source-map",
    entry: components,
    output: {
        path: path.resolve(__dirname, "../lib/packages"),
        filename: "[name]/index.js",
        publicPath: "/",
        library: "[name]",
        libraryTarget: "umd",
        libraryExport: "default",
        umdNamedDefine: true
    }
})
