const path = require("path");
const merge = require("webpack-merge");
const webpackLibBaseConfig = require("./webpack.base.js");

module.exports = merge(webpackLibBaseConfig, {
    mode: "production",
    entry: {
        "hztl-ui": path.resolve(__dirname, "../src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "../lib"),
        filename: "hztl-ui.common.js",
        publicPath: "/dist/",
        library: "hztl-ui",
        libraryTarget: "umd",
        libraryExport: "default",
        umdNamedDefine: true
    }
})
