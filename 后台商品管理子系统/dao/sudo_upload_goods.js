const conn = require('./db_config')

module.exports = function (req) {
    
    return new Promise((resolve, reject) => {

        var body = req.body
        
        console.log(body)

        let sql = `CREATE table IF NOT EXISTS goods_${body.goods_kind}_info (goods_id int UNSIGNED AUTO_INCREMENT,goods_name varchar(20) not null,goods_kind varchar(20) not null,goods_position varchar(20) not null,goods_style varchar(20) not null,goods_price varchar(20) not null,goods_price_invalide varchar(20) not null,goods_number varchar(50) not null,goods_count varchar(10) not null,goods_desc varchar(100),create_time datetime,PRIMARY key(goods_id))ENGINE=InnoDB DEFAULT CHARSET=utf8;`

        console.log('开始创建goods_info...')
        conn.query(sql, (err, result) => {
            if (err) {
                console.log('数据表goods_info创建失败')
                
            } else {
                console.log('数据表goods_info创建成功')

                sql = `insert into goods_${body.goods_kind}_info (goods_name,goods_kind,goods_position,goods_style,goods_price,goods_price_invalide,goods_number,goods_count,goods_desc,create_time) values ('${body.goods_name}','${body.goods_kind}','${body.goods_position}','${body.goods_style}','${body.goods_price}','${body.goods_price_invalide}','${body.goods_number}','${body.goods_count}','${body.goods_desc}',now())`

                console.log(sql)

                conn.query(sql,(err,result)=>{
                    if (err) {
                        console.log('提交失败')   
                        reject(new Error('提交失败'))
                    } 
                    else {
                        console.log('提交成功',result)
                        resolve(result)

                      
                    }
                })
               

            }
        })

    })
}