const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const webpackCommonConfig = require("./webpack.config.js");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");

module.exports = merge(webpackCommonConfig, {
    // 指定模式，这儿有none production development三个参数可选
    mode: "production",
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                // node_modules下的模块拆分到chunk-vendors.xxxx.js下
                vendors: {
                    name: "chunk-vendors",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: "all"
                },
                // 自己定义的公告组件超过两次引用的放在chunk-common.xxxx.js下
                common: {
                    name: "chunk-common",
                    minChunks: 2,
                    priority: -20,
                    chunks: "all",
                    reuseExistingChunk: true
                }
            }
        }
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
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpackBundleAnalyzer({
            analyzerMode: "static"
        }),
        // 新建miniCssExtractPlugin实例并配置
        new miniCssExtractPlugin({
            filename: "css/[name].[hash:4].css",
            chunkFilename: "css/[name].[hash:4].css"
        }),
        // 压缩css
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
});