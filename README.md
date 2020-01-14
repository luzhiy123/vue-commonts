## 参考
 https://juejin.im/post/5e0b1116f265da5d1a4469d7
 和element-ui

## 启动本地
npm install
npm start

## 打包
    1、 命令
    npm run build   编辑组件
    npm start 启动 demo
    2、注意
    组件在 components.json引入，不要直接修改入口文件index.js
    3、第三方组件打包剔除
     在webpack.lib.base 中按照webpack externals配置
