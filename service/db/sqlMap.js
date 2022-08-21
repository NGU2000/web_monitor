var sqlMap = {
  user: {
    add: 'insert into user (username, useremail, password, userip, userarea) values (?,?,?,?,?)',
    select: 'select * from user',
    getid: 'select user.userid from user where user.useremail',
  },
  error:{
    add: 'insert into error (type, time, url, msg, stack, userid) values (?,?,?,?,?,?)',
    select: 'select * from error',
  },
  behavior:{
    add: 'insert into behavior (type, time, url, msg, value, userid) values (?,?,?,?,?,?)',
    select: 'select * from behavior',
  },
  performance:{
    add: 'insert into performance (type, time, url, value, userid) values (?,?,?,?,?)',
    select: 'select * from performance',
  },
}

module.exports = sqlMap; 