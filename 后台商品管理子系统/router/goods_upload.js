const express = require('express')

const router = new express.Router()
const execQuery_upload = require('../dao/sudo_upload_goods')

router.put('/sudo/upload/goods_info',(req,res)=>{
    console.log('-----收到提交商品请求-----')
    console.log(req.body)
    if(!req.body){
        res.status(400).json({code:0,msg:"参数不对"})
        return;
    }
    execQuery_upload(req).then((result)=>{
       
       
        res.status(200).json({code:1,msg:"提交成功",goods_id:result.insertId})

    }).catch(()=>{

        res.status(200).json({code:1,msg:"提交失败"})
    })
})

module.exports = router