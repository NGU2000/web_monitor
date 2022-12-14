const models = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');

const conn = mysql.createConnection(models.mysql);
conn.connect();

// 登录接口
router.post('/login', (req, res) => {
  const user = req.body;
  const sel_email = $sql.user.select + " where useremail = '" + user.useremail + "'";
  console.log(sel_email);
  conn.query(sel_email, user.useremail, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    if (results[0] === undefined) {
      res.send('-1'); // -1 表示查询不到，用户不存在，即邮箱填写错误
    } else {
      if (
        results[0].useremail == user.useremail &&
        results[0].password == user.password
      ) {
        res.send('0'); // 0 表示用户存在并且邮箱密码正确
      } else {
        res.send('1'); // 1 表示用户存在，但密码不正确
      }
    }
  })
})

// 注册接口
router.post('/add', (req, res) => {
  const params = req.body;
  const sel_sql = $sql.user.select + " where username = '" + params.username + "'";
  const add_sql = $sql.user.add;
  console.log(sel_sql);
  //查询
  conn.query(sel_sql, params.username, (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.length != 0 && params.username == results[0].username) {
      res.send('-1'); // -1 表示用户名已经存在
    } else {
      conn.query(
        add_sql,
        [params.username, params.useremail, params.password, params.userip, params.userarea],
        (err, rst) => {
          if (err) {
            console.log(err);
          } else {
            console.log(rst);
            res.send('0'); // 0 表示用户创建成功
          }
        }
      )
    }
  })
});

//查询id接口
router.post('/getid',(req,res) =>{
  const params = req.body;
  const get_sql = $sql.user.getid + " = '" + params.useremail + "'";
  console.log(get_sql);
  //查询
  conn.query(get_sql, params.useremail, (error, results) => {
    if(error){
      console.log(err);
    }
    else{
      console.log(results);
      res.send(results);//将ID值传递回去
    }
  })
})
module.exports = router;
