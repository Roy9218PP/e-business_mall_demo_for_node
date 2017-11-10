const express = require('express')

const bodyParser = require('body-parser')

const app = express()

app.set('port',process.env.port || 3002)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(require('./router/goods_upload'))

app.listen(app.get('port'),()=>{
    console.log('server running at 127.0.0.1:',app.get('port'))
})