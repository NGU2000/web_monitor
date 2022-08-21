const models = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');

const conn = mysql.createConnection(models.mysql);
conn.connect();

//用户行为载入接口
router.post('/add', (req, res) => {
    const params = req.body;
    const add_sql = $sql.behavior.add;
    conn.query(
        add_sql,
        [params.type, params.time, params.url, params.msg, params.value, params.userid],
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
);

module.exports = router;