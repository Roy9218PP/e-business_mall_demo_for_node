const mysql = require('mysql')

var conn =  mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:'123456',
    database:"indoor_outdoor"
})
console.log('开始建立数据库连接...')
conn.connect()
console.log('数据库连接成功')

module.exports = conn;
