//mport Api from '../utils/api'
const { Api } = require('../utils/api')

const User = require('../models/user')
const Assignment = require('../models/assignment')

module.exports.getOrgs = async (req, res) =>{
    const user = await User.findById(req.user._id, 'accessToken')
    Api('GET', 'https://api.github.com/user/memberships/orgs?state=active', {}, { Authorization: `Bearer `+user.accessToken })
        .then(data =>{
            //console.log(data)
            return res.json(data)
            //dispatch({ type: types.AUTH_LOADED, user})
        })
        .catch(()=>{
            //clearToken()
            //return dispatch({ type: types.AUTH_INIT})
        })
}

module.exports.getRepos = async (req, res) =>{
    const user = await User.findById(req.user._id, 'accessToken')
    Api('GET', 'https://api.github.com/orgs/'+req.params.slug+'/repos', {},{ Authorization: `Bearer `+user.accessToken })
        .then(rawData =>{
            let data = []
            rawData.forEach(element => {
                data.push({
                    id: element.id,
                    name: element.name,
                    url: element.html_url,
                    desc: element.description,
                    owner: {
                        id: element.owner.id,
                        login: element.owner.login,
                        url: element.owner.html_url
                    }
                })
            })
            return res.json(data)
        })
        .catch(()=>{
        })
}
module.exports.getOrgName = async (req, res) => {
    const user = await User.findById(req.user._id, 'accessToken')
    Api('GET', 'https://api.github.com/orgs/'+req.params.slug, {},{ Authorization: `Bearer `+user.accessToken })
        .then(data =>{
            const { description } = data
            return res.json(description)
        })
        .catch(()=>{
        })
}
module.exports.getAssignments = async (req, res) => {
    const assignments = await Assignment.find({subject: req.params.slug})
    return res.json(assignments)
}
module.exports.saveAssignment = async (req, res) => {
    const existingAssignment = await Assignment.findOne({gId: req.body.key})
    if(!existingAssignment){
        const assignment = await new Assignment({
            ownerId: req.user._id,
            gId: req.body.key,
            subject: req.body.owner.login,
            name: req.body.desc,
            slug: req.body.name,
            url: req.body.url,
            grading: false,
            deleted: false
        }).save()
        return res.json({msg: 'Assignment saved'})
    }
    return res.json({msg: 'Assignment exists'})
    
}
