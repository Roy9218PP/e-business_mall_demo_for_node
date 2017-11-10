const session = require('express-session')  
//获取RedisStore
const RedisStore = require('connect-redis')(session)
const SESSSION_PASS = '123456';
const REDIS_PASS = '123456';
module.exports = session({
    name:'indoor_outdoor',
    secret:SESSSION_PASS,
    resave:false,
    saveUninitialized:false,
    //7天后过期
    cookie:{maxAge:7 * 24 * 60 * 60 * 1000},
    store:new RedisStore({
        host:'localhost',
        port:'6379',
        pass:REDIS_PASS
    })
})


/*
//const SessionStore = require('express-mysql-session')(session);
module.exports = session({  
    name:'indoor_outdoor',  
    secret:secret,  
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:2 * 24 * 60 * 60 * 1000,secure: true},
    store: new SessionStore({  
        host: 'localhost',  
        port: 3306,  
        user: 'root',  
        password: secret,  
        database: 'indoor_outdoor'
        
    } )
})
*/
