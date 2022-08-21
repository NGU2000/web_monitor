# web_monitor

## 实现功能

实现登录和注册两个功能，实现全栈，数据记录在数据库，前后端分离

------

## 项目部署

### 数据库

数据库为login，分为四张表存储不同信息。

user表储存用户信息

表中类型都是为 varchar，建了简单表， user表结构如下：

userid|username|useremail|password|userip|userarea
---|:--:|:--:|---|---|---
1|user|user@163.com|user|http://127.0.0.1:10520|江苏省
2|admin|admin@163.com|admin|http://127.0.0.1:10520|江苏省
|||||

error表储存用户信息

| errid | type | time               | url                         | msg                                                     | stack                                                        | userid |
| ----- | ---- | ------------------ | --------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| 1     | 0    | 2022-8-19 10:20:10 | http://127.0.0.1：10520/map | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Request failed with status code 404 at createError(createError.js？2d83:16:1) at settle (settle.js?467f:17:1) at XMLHttpRequest.handleLoad (xhr.js?b50d:61:1) | 1      |

behavior表储存用户行为信息

| behid | type | time               | url                         | msg   | value | userid |
| ----- | ---- | ------------------ | --------------------------- | ----- | ----- | ------ |
| 1     | 0    | 2022-8-19 10:20:10 | http://127.0.0.1：10520/map | blank | 1     | 1      |



performance表储存网页性能信息

| perfid | type | time               | url                       | value | userid |      |
| ------ | ---- | ------------------ | ------------------------- | ----- | ------ | ---- |
| 1      | 0    | 2022-8-19 10:20:10 | http://127.0.0.1:10520/lo | 1     | 1      |      |



### 项目初始化

```
npm install
```

### 后端部署和运行
```
cd service
npm install
node app.js
```

### 运行前端项目
```
npm run serve
```
-------

## 使用到的技术

### 前端：

- html
- css
- vue.js
- vue-cli
- vue-router

### 后端：

- node.js
- express
- mysql

--------
