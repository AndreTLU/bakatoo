const { Api } = require('../utils/api');

const User = require('../models/user');
const Assignment = require('../models/assignment');
const Subject = require('../models/subject');
const Work = require('../models/work');

function string_to_slug(str, separator) { 
  str = str.trim(); 
  str = str.toLowerCase(); 
  const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;"; 
  const to = "aaaaaaeeeeiiiioooouuuunc------"; 

  for (let i = 0, l = from.length; i < l; i++) { 
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i)); 
  } 

  return str 
  .replace(/[^a-z0-9 -]/g, "") // remove invalid chars 
  .replace(/\s+/g, "-") // collapse whitespace and replace by - 
  .replace(/-+/g, "-") // collapse dashes 
  .replace(/\./g, "") 
  .replace(/^-+/, "") // trim - from start of text 
  .replace(/-+$/, "") // trim - from end of text 
  .replace(/-/g, separator); 
} 

module.exports.getOrgs = async (req, res) =>{
  const user = await User.findById(req.user._id, 'accessToken')
  Api('GET', 'https://api.github.com/user/memberships/orgs?state=active', {}, { Authorization: `Bearer `+user.accessToken })
    .then(data =>{
      console.log(data)
      let newData = [];   
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
  const assignm = await Assignment.find({}, 'slug').populate('subject', 'slug');
  const user = await User.findOne({}, 'accessToken');
  for( let e of assignm ){
    console.log(e);
    Api('GET', 'https://api.github.com/repos/'+e.subject.slug+'/'+e.slug+'/pulls', {}, { Authorization: `Bearer ${user.accessToken}`})
      .then( async data => {
        for ( let el of data){
          console.log(el.title);
          const existingWork = await Work.findOne({'key': el.id});
          const existingSubject = await Subject.findOne({'slug': e.subject.slug}, 'works');
          if(!existingWork){
            let newSlug = string_to_slug(el.title, '-');
            const newWork = await new Work({
              owner: {
                githubId: el.user.id,
                login: el.user.login,
                url: el.user.html_url
              },
              title: el.title,
              slug: newSlug,
              key: el.id,
              subject: e.subject._id,
              state: el.state,
              url: el.html_url,
              assignment: e._id,
              graded: false
            }).save();
            existingSubject.works.push(newWork);
            existingSubject.save();
            console.log(el.title + ' saved'); 
          }else{
            console.log(el.title + ' exists');          
          }     
        }
      })
      .catch((err)=>{
          console.log(err)
      })
  }
}
module.exports.getRepos = async (req, res) =>{
  const user = await User.findById(req.user._id, 'accessToken');
  const temp = await Subject.findOne({key: req.params.id}, 'slug');
  Api('GET', 'https://api.github.com/orgs/'+temp.slug+'/repos', {},{ Authorization: `Bearer `+user.accessToken })
    .then(rawData =>{
      let data = []
      rawData.forEach(element => {
        data.push({
          key: element.id,
          slug: element.name,
          url: element.html_url,
          description: element.description,
          owner: {
            id: element.owner.id,
            login: element.owner.login,
            url: element.owner.html_url
          }
        })
      })
      console.log(data);
      return res.json(data);
    })
    .catch(()=>{
    })
}
module.exports.getOrgName = async (req, res) => {
  const user = await User.findById(req.user._id, 'accessToken');
  Api('GET', 'https://api.github.com/orgs/'+req.params.slug, {},{ Authorization: `Bearer `+user.accessToken })
    .then(data =>{
      const { description } = data;
      return res.json(description);
    })
    .catch(()=>{
    });
}
module.exports.getAssignments = async (req, res) => {
  const subject = await Subject.findOne({'slug': req.params.slug});
  const assignments = await Assignment.find({subject: subject._id});
  return res.json(assignments)
}
module.exports.getAssignment = async (req, res) => {
  const assignment = await Assignment.findOne({slug: req.params.slug});
  return res.json(assignment);
}
module.exports.saveAssignment = async (req, res) => {
  console.log(req.body);
    const existingAssignment = await Assignment.findOne({key: req.body.assignment.key})
    const subject = await Subject.findById(req.body.subject);
    if(!existingAssignment){
        const assignment = await new Assignment({
            owner: req.user._id,
            key: req.body.assignment.key,
            description: req.body.assignment.description,
            subject: subject._id,
            slug: req.body.assignment.slug,
            url: req.body.assignment.url,
            grading: false,
            deleted: false
        }).save();
        subject.assignments.push(assignment);
        subject.save();
        return res.status(200).send({message: 'Assignmend saved'});
    }
    return res.status(500).send({message: 'Error'});
    
}
