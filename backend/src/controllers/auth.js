import { blacklistToken, signToken } from '../utils/jwt';

const User = require('../models/user')

module.exports.githubLogin = async (req,res) => {
    console.log(req.user.id)
    const existingUser = await User.findOne({'login.githubId': req.user.id})
    if(!existingUser){
        console.log('no user exists')
        const user = await new User({
            profile:{
                name: req.user.name,
                loginName: req.user.login,
                email: req.user.email
            },
            login:{
                githubId: req.user.id
            }
        }).save()

        const token = signToken(user)
        console.log(token)
    }
}

module.exports.logout = async (req,res) => {
    const blacklisted = await blacklistToken(req.user)
    if(!blacklisted) return res.status(500).send({msg: 'Unable to blacklist active token'})

    console.log(`${req.user._id} token blacklisted`)
    return res.json({message: 'Successfully logged out'})
}