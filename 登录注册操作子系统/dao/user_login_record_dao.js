const conn = require('./db_config')

module.exports = function (user_info) {
   
    return new Promise((resolve, reject) => {

        let sql = 'create table if not exists  user_login_info (user_login_id int UNSIGNED AUTO_INCREMENT,user_id int UNSIGNED,user_name varchar(20),user_login_ip varchar(20),user_login_datetime datetime,PRIMARY key(user_login_id))engine=INNODB default charset=utf8'
        
        console.log('user_login_info开始创建...')

        conn.query(sql, (err, result) => {
            if (err) {
                console.log('user_login_info创建失败')
                console.log(err.message)

                reject(new Error('user_login_info创建失败'))
            }
            else {
                console.log('user_login_info创建成功')

                sql = `insert into user_login_info (user_id,user_name,user_login_datetime,user_login_ip) values (${user_info.user_id},'${user_info.user_name}',now(),'${user_info.ip}')`

                console.log(sql)

                console.log('开始保存登录记录...')

                conn.query(sql, (err, result) => {
                    console.log(result.insertId)
                    err ? reject(err) : resolve()

                   
                })
            }
        })

       

    })
}