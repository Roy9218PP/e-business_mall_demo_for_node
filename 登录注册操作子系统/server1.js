const express = require('express');

const bodyParser = require('body-parser');
const httpProxy = require('http-proxy-middleware')
const favicon = require('express-favicon') 
const redisClient = require('./redisClient')
const sessionStore = require('./sessionStore')
const cookieParser = require('cookie-parser');
const CryptoJS = require('crypto-js')

const app = express()

app.set('port',process.env.port || 3001);

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(favicon());
app.use(sessionStore) 


//获取用户登录状态
app.use(require('./router/user_status'))

//用户登录操作
app.use(require('./router/user_login'))

//用户注册操作
app.use(require('./router/user_register'))

app.listen(app.get('port'),()=>{

    console.log('server running at 127.0.0.1:',app.get('port'))
})


