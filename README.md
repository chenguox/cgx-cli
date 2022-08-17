# 说明文档

### `cgx-cli` ： 一个帮助你快速搭建和开发前端项目的 CLI

如何安装？

> npm  install cgx -g

## 创建项目

目前支持快速创建 Vue H5 项目，后期会继续优化~

* 常用的目录结构（可以在此基础上修改）
* pinia 状态管理
* axios （网络请求 axios 的安装以及二次封装）
* vue-router (router 的安装和配置，路由动态加载和路由动画的封装)
* 持久化存储插件封装
* 路由动画的封装
* less 预处理器
* 配置多环境变量
* 配备 vconsole.js
* 请求 loading 加载

创建项目

> cgx create you_project_name

自动拉取项目模板、安装项目依赖、打开浏览器 `http://localhost:5173`、自动启动项目

## 项目开发

项目开发目前提供三个功能：

* 创建 Vue 组件（setup 特性）
* 创建 Vue 页面，并配置路由和 pinia 状态
* 创建 pinia 子模块


## 创建Vue组件：

```shell
cgx addcpn YourComponentName # 例如cgx add NavBar，默认会存放到src/components文件夹中
cgx addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
```

### 创建Vue页面，并配置路由

```shell
cgx addpage YourPageName # 例如cgx addpage Home，默认会放到src/pages/home/Home.vue中，并且会创建src/page/home/router.js
cgx addpage YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
```

创建组件页面会创建 route.js 文件：

* router.js 文件是当前页面的路由配置
* 创建该文件会通过 src/router/index.js 中自动加载到路由的 routes 配置中，不再需要手动配置。
* 相关代码如下：

```
// 动态生成 routes
const routeFiles = import.meta.glob('@/views/*/router.js')
// 默认重定向为 home
const routes = [{
  path: "/",
  redirect: "/home",
}]
for(const path in routeFiles){
  const module = await routeFiles[path]()
  routes.push(module.default)
}
```

### 创建 pinia子模块

```shell
cgx addstore YourVuexChildModuleName # 例如cgx addstore home，默认会放到src/store/modules/home/index.js和types.js
cgx addstore YourVuexChildModuleName -d src/vuex/modules # 也可以指定文件夹
```
