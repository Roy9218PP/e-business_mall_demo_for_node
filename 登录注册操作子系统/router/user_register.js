const express = require('express')

const router = new express.Router()

const execQuery_register = require('../dao/user_register_dao')

router.put('/user/register_info',(req,res)=>{
    console.log('-----收到注册请求-----')
    console.log(req.body)
    if(!req.body){
        res.status(400).json({code:0,msg:"参数不对"})
        return;
    }
    execQuery_register(req).then((result)=>{
       
        //保存session
        if(!req.session.userInfo){
            req.session.userInfo = {}
        }
        req.session.userInfo.user_name = req.body.user_name;
        req.session.userInfo.user_psw = req.body.user_psw;
        req.session.userInfo.user_email = req.body.user_email;
        req.session.userInfo.last_login_time = Date();
       
        res.status(200).json({code:1,msg:"注册成功"})

    }).catch(()=>{

        res.status(200).json({code:2,msg:"注册失败"})
    })
   

})

module.exports = router;