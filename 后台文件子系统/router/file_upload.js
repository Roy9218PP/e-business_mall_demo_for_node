const express = require('express')

const router = express.Router()

const multer = require('multer')

const fs = require('fs')

const util = require('../utils/file.extension')

//multer.diskStorage设置文件保存在磁盘的路径以及文件名
var storage = multer.diskStorage({
    filename(req,files,exec){
       for(var i = 0; i < files.length;i++){
            var file = files[i]

            var type =  util.get_img_extension(file)
        
            exec(null,`${i}.${type}`)
       }
       
        
    },
    //参数1:req,是提交的请求对象
    //参数2:file是提交的文件
    //参数3:exec是一个函数,用来设置文件保存路径
    destination(req,files,exec){
        console.log('==========================',req.cookies)
        var goods_id = req.params.goods_id
        var path = 'static/${goods_id}'
        fs.exists(path,(isExists)=>{
            if(!isExists){
                fs.mkdirSync(path)
            }
        })
        exec(null,'static/${goods_id}/')
    }
})

var upload =  multer({storage})

router.post('/sudo/upload/goods_imgs/goods_id',upload.array('goods_imgs'),(req,res)=>{
   
    console.log('收到请求了！！！！！！！！')

    res.status(200).json({code:1,msg:"ok"})

})

module.exports = router;