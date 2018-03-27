//mport Api from '../utils/api'
const { Api } = require('../utils/api')

const User = require('../models/user')

module.exports.getOrgs = async (req, res) =>{
    console.log(req.params)
    //const user = await User.findById(req.user._id)
    Api('GET', 'http://api.github.com/users/'+req.params.name+'/orgs', {}, { Authorization: `Bearer a7a4c2e3186d308f0e3bd1595c88bfd5365d2b6f` })
            .then(data =>{
                console.log(data)
                return res.json(data)
               //dispatch({ type: types.AUTH_LOADED, user})
            })
            .catch(()=>{
                //clearToken()
                //return dispatch({ type: types.AUTH_INIT})
            })
}

module.exports.saveOrg = async (req, res) =>{
    console.log(req)
}


