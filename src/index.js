const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const {mongoose}=require('./database')

//SETTINGS 
app.set('port', process.env.PORT || 3000)

//MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())

//ROUTES
app.use('/app/task',require('./routes/task.routes.js'))

//STATICS
app.use(express.static(path.join(__dirname,'public')))
///STARTING SERVER
app.listen(app.get('port'), ()=>{
    console.log(`server listening on ${app.get('port')}`)
})