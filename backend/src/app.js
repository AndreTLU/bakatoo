const express = require('express');
const morgan = require('morgan');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const passport = require('passport');
const helmet = require('helmet');
const app = express();

const GithubStrategy = require('passport-github2').Strategy;

const User = require('./models/user');



mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, (err)=>{
  if(err) console.log(err)
  console.log('Connected to MongoDB');
});
app.use(morgan('dev'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true}));

app.use(passport.initialize());
passport.use(new GithubStrategy({
  clientID: process.env.GitclientID,
  clientSecret: process.env.GitClientSecret,
  callbackURL: process.env.GitCallback
}, (accessToken, refreshToken, profile, done)=>{
  //console.log(accessToken)
  profile.token = accessToken
  return done(null, profile);
}));

// app.use((req,res,next)=>{
//     const err = new Error('Resource not found')
//     err.status = 404
//     next(err)
// })
// app.use((err, req, res) =>{
//     res.status(err.status || 500).json({
//         status: err.status || 500,
//         message: process.env.NODE_ENV === 'development' ? err.message:''
//     })
// })

app.use('/api', require('./routes'));
const { AssignmentJob } = require('./utils/cronJobs');
AssignmentJob().start();

module.exports = app;