const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const userApi = require('./api/userApi.js');
const errApi = require('./api/errApi.js');
const perfApi = require('./api/performanceApi.js');
const behApi = require('./api/behaviorApi.js');


//设置跨域请求
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers','Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// 解析 application/json
app.use(bodyParser.json());

app.use(cors());

//添加API
app.use('/api/user', userApi);
app.use('/api/error', errApi);
app.use('/api/performance', perfApi);
app.use('/api/behavior', behApi);

app.listen(10520);
console.log('Success Connect to the DataBase');