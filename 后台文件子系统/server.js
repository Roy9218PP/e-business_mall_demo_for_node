const express = require('express')

const app = express()

app.set('port',process.env.port || 3003)


app.use(require('./router/file_upload'))

app.listen(app.get('port'),()=>{
    console.log('server running at 127.0.0.1:',app.get('port'))
})