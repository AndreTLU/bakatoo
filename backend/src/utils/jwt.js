const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.SECRET
const validateJwt = expressJwt({ secret: jwtSecret })
const Token = require('../models/token')
const User = require('../models/user')

module.exports.jwtEnsure = async (req,res,next)=>{
    if(!req.user){
        return next(new Error('Not authorized'))
    }
}

module.exports.jwtCheck = (req,res,next)=>{
    return validateJwt(req,res, ()=>{ next() })
}

module.exports.signToken = user => {
    return jwt.sign(
        {
            _id: user._id,
            ts: new Date().getTime()
        },
        jwtSecret,
        { expiresIn: parseInt(process.env.TOKEN_EXPIRES_IN_SECONDS)}
    )
}

module.exports.blacklistToken = user => new Token({
    userId: user._id,
    token: JSON.stringify(user),
    expires: user.exp * 1000
}).save()