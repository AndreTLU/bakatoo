//mport Api from '../utils/api'
const { Api } = require('../utils/api')

const User = require('../models/user')
const { signToken, blacklistToken } = require('../utils/jwt')

module.exports.getUser = async (req, res) =>{
    //console.log('asdasdasd')
    const user = await User.findById(req.user._id)
    if (!user) return res.status(401).send({ msg: 'Not authorized' })
    let data = {
        user: {
            _id: user._id,
            profile: {
                name: user.profile.name,
                loginName: user.profile.loginName,
                email: user.profile.email
            },
            login: {
                githhubId: user.login.githubId
            },
            updatedAt: user.updatedAt
        }
    }
    return res.json(data)
}


