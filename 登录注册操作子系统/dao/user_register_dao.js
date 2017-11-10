const conn = require('./db_config')

module.exports = function (req) {
    
    return new Promise((resolve, reject) => {

        var body = req.body

        let sql = "CREATE table IF NOT EXISTS user_info (user_id int UNSIGNED AUTO_INCREMENT,user_name varchar(20) not null,user_psw varchar(100) not null,user_email varchar(50) not null,recommend_user varchar(20),user_sex varchar(2),user_avatar varchar(100),create_time datetime,PRIMARY key(user_id))ENGINE=InnoDB DEFAULT CHARSET=utf8;"

        console.log('开始创建user_info...')
        conn.query(sql, (err, result) => {
            if (err) {
                console.log('数据表user_info创建失败')
                
            } else {
                console.log('数据表user_info创建成功')
                sql = `select * from user_info where user_name='${body.user_name}'`;
                conn.query(sql,(err,result)=>{
                    if (err) {
                        console.log('获取user_info信息失败')   
                    } 
                    else {
                        console.log('获取user_info信息成功',result)
                        if(result.length > 0){
                            reject(new Error('该用户已经存在!'))
                            return;
                        }
                        sql = `insert into user_info (user_name,user_psw,user_email,recommend_user,create_time) values ('${body.user_name}','${body.user_psw}','${body.user_email}','${body.recommend_user}',now())`
                        console.log(sql)
                        console.log('开始插入数据...')
        
                        conn.query(sql, (err, result) => {
                            if (err) {
                                console.log('数据库插入失败')
                                console.log(err.message)
                                reject(new Error('数据插入失败!'))
                                
                            } else {
                                console.log('数据库插入成功')
                                resolve(result)
                               
                            }
                        })
                    }
                })
               

            }
        })

    })
}