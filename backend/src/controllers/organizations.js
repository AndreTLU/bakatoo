const { Api } = require('../utils/api');

const User = require('../models/user');
const Assignment = require('../models/assignment');
const Work = require('../models/work');

module.exports.getOrgs = async (req, res) =>{
    const user = await User.findById(req.user._id, 'accessToken')
    Api('GET', 'https://api.github.com/user/memberships/orgs?state=active', {}, { Authorization: `Bearer `+user.accessToken })
        .then(data =>{
            console.log(data)
            let newData =[];
            data.forEach((e)=>{
                newData.push({
                    key: e.organization.id,
                    description: e.organization.description,
                    url: e.organization.url,
                    slug: e.organization.login,
                    repos_url: e.organization.repos_url
                });
            });
            console.log(newData);
            return res.json(newData);
        })
        .catch(()=>{
        });
}

module.exports.cronJobAction = async () => {
    const assignm = await Assignment.find({})
    for( let e of assignm ){
        console.log(e)
        Api('GET', 'https://api.github.com/repos/'+e.subject+'/'+e.slug+'/pulls', {}, { Authorization: `Bearer 6ef9809a93b3e72892a512285e98b3d9baaa90cd`})
            .then( async data => {
                for ( let el of data){
                    const w = await Work.findOne({'gId': el.id})     
                    if(!w){
                        const user = await User.findOne({'login.githubId': el.user.id})
                        const work = await new Work({
                            owner: user._id,
                            gId: el.id,
                            subject: el.base.user.login,
                            state: el.state,
                            name: el.title,
                            slug: el.number,
                            url: el.html_url,
                            assignment: e._id
                        }).save()
                        console.log('Saved '+work._id)
                    }
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
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
    console.log(req.params.slug)
    return res.json(assignments)
}
module.exports.getWorks = async (req, res) => {
    const workList = []
    Work.find({}).populate('assignment', null, {gId: req.params.slug}).populate('owner').exec((err, works)=>{
        works.filter((work)=>{
            if(work.assignment !== null){
                workList.push(work)
            }
        })
        console.log(workList)
        return res.json(workList)
    })
}
module.exports.saveAssignment = async (req, res) => {
    const existingAssignment = await Assignment.findOne({gId: req.body.key})
    if(!existingAssignment){
        const assignment = await new Assignment({
            owner: req.user._id,
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
