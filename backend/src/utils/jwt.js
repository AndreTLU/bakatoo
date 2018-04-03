const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.SECRET
const validateJwt = expressJwt({ secret: jwtSecret })
const Token = require('../models/token')
const User = require('../models/user')

module.exports.jwtEnsure = async (req, res, next) => {
    if (!req.user) {
      // token not valid or expired
      return next('No valid token')
    }
  
    try {
      // check if blacklisted
      const isBlacklisted = await Token.findOne({ token: JSON.stringify(req.user) })
      if (isBlacklisted) {
        log.warning(`${req.user._id} tried blacklisted token ${isBlacklisted}`)
  
        return next('Not authorized')
      }
  
      // check if token valid after user data changed
      const user = await User.findById(req.user._id).select('login.passwordUpdatedAt')
      if (!user) return next('Cant find user')
  
      // DO NOT allow if user password changed after last token issued
      const lastPassUpdate = Math.floor(new Date(user.updatedAt) * 1 / 1000)
      if (lastPassUpdate >= req.user.iat) {
        const blacklisted = await this.blacklistToken(req.user)
  
        if (!blacklisted) return next(new Error('Unable to blacklist active token'))
        log.info(`${req.user._id} token blacklisted`)
  
        return next('Unauthorized')
      }
  
      // all good, proceed
      return next()
    } catch (err) {
      return next('Server error')
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