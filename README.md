# vue-starter

> 基于 [Vue](https://github.com/vuejs/vue) 的 [SPA](http://baike.baidu.com/item/SPA/17536313) 开发框架

## 目录结构
```shell
├── build # 构建脚本
├── config # 构建脚本配置文件
├── dist # 编译自动生成的部署文件
├── node_modules # npm 包
|
├── src # 源文件目录
|   ├── api # api 目录
|   ├── assets # 资源目录，包括 css、img 等
|   ├── components # 组件
|   ├── conf #配置项
|   ├── routes # 页面路由，配合 Controller
|   ├── static # 静态资源
|   ├── app.js
|   ├── startup.js # server 启动入口
|
|
```
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
