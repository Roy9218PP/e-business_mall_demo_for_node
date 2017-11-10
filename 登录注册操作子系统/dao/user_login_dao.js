const conn = require('./db_config')

module.exports = function(req){
   
    return new Promise((resolve,reject)=>{

        let sql = `select user_name,user_psw,user_id from user_info where user_name='${req.body.user_name}'`

        console.log('开始查询用户名...')

        conn.query(sql,(err,result)=>{
            if(err){

                console.log('用户信息查询失败')
                console.log(err.message)
                reject(new Error('用户信息查询失败'))
                
            }
            else{
                console.log('用户信息查询成功')
                resolve(result)
                
            }
        })

       
    })
}