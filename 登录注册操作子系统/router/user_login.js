const express = require('express')

const router = new express.Router()

const execQuery_login = require('../dao/user_login_dao')

const execQuery_login_record = require('../dao/user_login_record_dao')

router.post('/user/login_info', (req, res) => {
    console.log('-----收到登录请求-----')
    execQuery_login(req).then(result => {
        console.log(result)
        if (result.length > 0) {
           console.log(req.body.user_psw)
            if (req.body.user_psw == result[0].user_psw) {
                
                console.log('登录成功')

                 //保存session
                if(!req.session.userInfo){
                    req.session.userInfo = {}
                }
                req.session.userInfo.user_name = req.body.user_name;
                req.session.userInfo.user_psw = req.body.user_psw;
                req.session.userInfo.remmber_me = req.body.remmber_me;
                req.session.userInfo.auto_login = req.body.auto_login;
                req.session.userInfo.last_login_time = Date();
                //刷新过期时间
                req.session._garbage = Date();
                req.session.touch();


                res.status(200).json({
                    code: 1,
                    msg: "登录成功"
                })


                //保存登录记录
                let user_info = result[0];
                user_info.ip = req.ip
                execQuery_login_record(user_info).then(() => {
                    console.log('保存成功')
                }).catch(err => {

                    console.log(err.message)
                })

            } else {
                //reject(new Error('密码错误'))
                res.status(200).json({
                    code: 0,
                    msg: "密码错误"
                })
            }
        } else {
            console.log('用户不存在')
            res.status(200).json({
                code: 0,
                msg: "该用户不存在"
            })
        }
    }).catch(err => {
        res.status(200).json({
            code: 0,
            msg: "登录失败"
        })
    })
   


})

module.exports = router;