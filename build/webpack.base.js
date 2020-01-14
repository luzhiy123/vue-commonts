const VueLoaderPlugin = require("vue-loader/lib/plugin");
const config = require("./config");

module.exports = {
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: config.alias
    },
    externals: config.externals,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 5120,
                            esModule: false,
                            fallback: "file-loader",
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
