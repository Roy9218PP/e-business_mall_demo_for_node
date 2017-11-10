const express = require('express')

const router = new express.Router()

router.get('/user/login_status',(req,res)=>{
    console.log('-----收到获取用户状态请求-----')

    let userInfo = req.session.userInfo;
    console.log(userInfo)
    if(userInfo){
        console.log('用户状态获取成功')
        res.status(200).json({code:1,msg:"success",userInfo})
       
    }else{

        res.status(200).json({code:0,msg:"none"}) 
    }
})

module.exports = router;