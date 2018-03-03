const express = require('express')
const morgan = require('morgan')
const bodyParse = require('body-parser')
const passport = require('passport')
const helmet = require('helmet')
const app = express();
const routes = require('./routes')(express)

app.use(morgan('dev'))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true}))

app.use(passport.initialize())
passport.use(new GitHubStrategy({
    clientID: process.env.GitclientID,
	clientSecret: process.env.GitClientSecret,
	callbackURL: process.env.GitCallback
}, (accessToken, refreshToken, profile, done)=>{
    return done(null, profile)
}))

app.use((req,res,next)=>{
    const err = new Error('Resource not found')
    err.status = 404
    next(err)
})
app.use((err, req, res) =>{
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: process.env.NODE_ENV === 'development' ? err.message:''
    })
})

app.use('/api', routes)

module.exports = app