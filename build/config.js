var path = require("path");
var fs = require("fs");
var nodeExternals = require("webpack-node-externals");
var Components = require("../components.json");

var utilsList = fs.readdirSync(path.resolve(__dirname, "../src/utils"));
var externals = {};

Object.keys(Components).forEach(function (key) {
    externals[`hztl-ui/packages/${key}`] = `hztl-ui/lib/packages/${key}`;
});

utilsList.forEach(function (file) {
    file = path.basename(file, ".js");
    externals[`hztl-ui/src/utils/${file}`] = `hztl-ui/lib/utils/${file}`;
});

const baseExternals = [
    nodeExternals(),
    "vue",
    /dayjs/,
    /^element-ui/,
    /^throttle-debounce/
];

exports.baseExternals = baseExternals;

externals = [
    Object.assign({
    }, externals),
    ...baseExternals
];

exports.externals = externals;

exports.alias = {
    main: path.resolve(__dirname, "../src"),
    packages: path.resolve(__dirname, "../packages"),
    examples: path.resolve(__dirname, "../examples"),
    "hztl-ui": path.resolve(__dirname, "../")
};

exports.vue = {
    root: "Vue",
    commonjs: "vue",
    commonjs2: "vue",
    amd: "vue"
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
