## 1.2.2（2024-11-20）
### 🚀 Features | 新功能

- 🚀 新增 `anyup-uniui` 引用方式，支持 `uni_modules` 引用方式、npm 引用方式
- 🚀 新增蓝牙模块 `Bluetooth`，支持蓝牙连接、断开、扫描、获取蓝牙设备、获取蓝牙服务、获取蓝牙特征、写入、读取、监听、关闭蓝牙连接、关闭蓝牙适配器
- 🚀 新增蓝牙打印模块 `Bluetooth`，支持一键连接蓝牙打印机，自动寻找可以支持读写的特征值，一键分片打印数据，支持 Android，iOS，小程序
- 🚀 优化 `Store` 模块，使用 `Store` 流程时，支持传入 `namespace` 命名空间进行操作
- 🚀 优化 `Tips` 模块，`loading` 支持自定义显示文案，`new Tips().loading('加载中...')`
- 🚀 优化 `Tips` 模块，`toast` 方式支持 `info、fail、success` 等方式调用，例如：`new Tips().toast('操作成功', 'success')` 可以写为 `new Tips().success('操作成功')`

### ♻️ Breaking Changes ｜ 破坏性更新

- ♻️ 修改 `anyup-uniui` 引用方式，`npm` 引用方式部分径变更
- ♻️ 修改 原先 `this.$tips` 工具的引用方式，统一修改为 `this.$_u.tips` 的方式调用，统一管理

### 🐛 Bug Fixes | Bug 修复

- 🐛 修复 `global.css` font 字体公共样式声明错误问题
- 🐛 修复 `Vue Cli` 方式创建的项目引入 `anyup-uniui` 库会报错的问题
## 1.0.7

### BREAKING CHANGES

- 优化 `Pager` 类，Pager.empty()方法修改为Pager.empty属性值获取，兼容App和小程序异常问题

## 1.0.5

### BREAKING CHANGES

- 优化 `App Updater` 版本更新组件优化，样式优化，支持热更新，支持primise request方式，详细见文档

## 1.0.3

### Features

- 新增 `Downloader` 下载器工具
- 优化 `store` 添加开发模式，日志储存
- 优化 部分组件功能

## 1.0.2

### Features

- 优化 版本更新样式
- 新增 apis服务器选择组件
- 优化 global css，压缩体积

### BREAKING CHANGES

- 优化 Pager 类分页模式，取消setType指定模式，动态计算pages页数

## 1.0.1

### Features

- 优化 工具类方法
- 新增 apis服务器选择组件
## 1.0.0

### Features

- 正式发布，兼容安卓、苹果、微信小程序
- 包含常用插件及常用JS工具库
- 项目最佳实践，低代码开发项目

### BREAKING CHANGES

- 相比0.x版本，优化目录结构src->libs，easycom 配置路径修改为`^au-(.*)": "@anyup/colorful-uni/components/au-$1/au-$1.vue`

### Features

- 优化 Pager 获取 offset 逻辑，兼容各种模式
- 新增 Pager 内部方法 resetData

## 0.0.29

### Features

- 优化 Pager 获取 offset 逻辑，兼容各种模式
- 新增 Pager 内部方法 resetData

## 0.0.28

### BREAKING CHANGES

- 优化 Pager 类分页模式，添加setType(type) 0:总页数分页 1:总数量分页，影响 hasMore() loadmore()方法，无入参，hasMore()方法内部自动page++，无需自己递增

### Bug Fixes

- 优化layout样式，配置clearfix样式，优化margin陷阱样式

---
## 0.0.27

### Bug Fixes

- 优化 loading 取消 bug，兼容小程序显示、隐藏问题

---

## 0.0.26

### BREAKING CHANGES

- 优化 Pager empty, 仅保留 empty() 方法
- 优化 Loading 组件参数，统一 visible 修改为 show

---

## 0.0.25

### Features

- 优化 layout props

### Bug Fixes

- 优化 Toast 提示，兼容微信小程序部分场景

---

## 0.0.24

- 添加 HttpHeader 支持, 支持 json, urlencoded, fromdata
- Http 支持 restURL 格式传递传递

---

## 0.0.23

- 优化分页 Pager, 支持 Object、Array

---

## 0.0.22

- 优化 z-index 层级

---

## 0.0.21

- 优化 Pager 及内部方法

---

## 0.0.18

- 优化 Http，支持 Upload
- 优化 Class 命名规范

---

## 0.0.1

- Initial release
