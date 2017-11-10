//安装redis并require加载redis模块
const redis = require('redis'),
    RDS_PORT = 6379,
    RDS_HOST = '127.0.0.1',
    //配置密码
    RDS_PASS = 123456,
    RDS_OPS = {},
    redisClient = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPS);

//redisClient.auth()用来进行密码认证
redisClient.auth(RDS_PASS, (err) => {
    if (err) {
        console.log('用户身份认证失败!')
    } else {

        console.log('认证成功')
    }
})

//ready是当redis配置完成后触发的事件
redisClient.on('ready', () => {
    console.log('redis服务已准备就绪...')
})

redisClient.on('end', () => {
    console.log('redis服务退出')
})

redisClient.on('connect', (err) => {
    if (!err) {
        console.log('redis服务连接成功...')
    }

})

module.exports = redisClient;