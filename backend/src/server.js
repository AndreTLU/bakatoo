const express = require('express')
const app = express();
const morgan = require('morgan')
//const mongoose = require('mongoose')
const bodyParse = require('body-parser')

require('dotenv').config()

app.use(morgan('dev'))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: false}))

app.use((req, res, next) =>{
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: process.env.NODE_ENV === 'development' ? err.message:''
    })
})

const port = process.env.APP_PORT || 8080
app.listen(port, ()=>{
    console.log('Backend started in '+ process.env.NODE_ENV + ' on port '+ port +'.')
})

module.exports = app