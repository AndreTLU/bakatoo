const { blacklistToken, signToken } = require('../utils/jwt')
const User = require('../models/user')

module.exports.githubLogin = async (req,res) => {
    //console.log(req)
    const existingUser = await User.findOne({'login.githubId': req.user.id})
    if(!existingUser){
        console.log('no user exists')
        //console.log(req)
        const user = await new User({
            profile:{
                name: req.user.displayName,
                loginName: req.user.username
            },
            login:{
                githubId: req.user.id
            }
        }).save()
        const token = signToken(user)
        return res.redirect('/?loading=true&token='+token)
    }
    const token = signToken(existingUser)
    return res.redirect('/?loading=true&token='+token)
}

module.exports.logout = async (req,res) => {
    const blacklisted = await blacklistToken(req.user)
    if(!blacklisted) return res.status(500).send({msg: 'Unable to blacklist active token'})

    console.log(`${req.user._id} token blacklisted`)
    return res.json({message: 'Successfully logged out'})
}