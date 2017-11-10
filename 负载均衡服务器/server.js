//CryptoJS加密解密不一致问题：https://www.douban.com/note/276592520/

const express = require('express');
const httpProxy = require('http-proxy-middleware')
const cluster = require('cluster')
const os = require('os')
const cpuNums = os.cpus().length;
const CryptoJS = require('crypto-js')
const secret = 'aaaabbbbccccdddd'
const app = express()
const cors = require('cors');
const session = require('express-session') 
app.set('port', process.env.port || 3000)
app.use(express.static('static'))
 

if (cluster.isMaster) {

    console.log(`代理服务器 主进程 ${process.pid} 正在运行...`)
    //判断时间戳是否过期
    console.log('判断时间戳是否过期')


    app.use((req, res, next) => {
       
        if (req.headers.timestamp) {

            var timestamp = req.headers.timestamp
            console.log(timestamp)

            const keyHex = CryptoJS.enc.Utf8.parse(secret);

            timestamp = CryptoJS.AES.decrypt(timestamp, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);

            timestamp = Number(timestamp);
          
            var now = new Date().getTime();

            if (now - timestamp <= 2 * 60 * 1000) {
                next()
            } else {
                res.status(200).json({
                    code: 0,
                    msg: "该操作已经失效"
                })
            }
        } else {
            res.status(200).json({
                code: 0,
                msg: "该操作已经失效"
            })
        }

    })
    cluster.on('exit', (worker) => {
        console.log(`代理服务器 工作进程 ${worker.process.pid} 停止运行!!!`)
    })

    //登录注册子系统
    app.use(httpProxy('/user/*', {
        target: "http://localhost:3001",
        changeOrigin: true
    }))

    //更多代理...

    app.listen(app.get('port'), () => {

        console.log(`server running at 127.0.0.1:${app.get('port')}`)
    })

    for (var i = 0; i < cpuNums; i++) {

         cluster.fork()
    }

} else {
    console.log('创建了一个子进程....')
    console.log(`代理服务器 工作进程 ${process.pid} 正在运行...`)
}