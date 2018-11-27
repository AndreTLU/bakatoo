const User = require('../models/user');
const Work = require('../models/work');

module.exports.getWork = async (req, res) => {
  console.log(`Getting single Homework data for: ${req.params.id}`);
  const workList = []
  Work.findOne({slug: req.params.slug}).exec((err, work)=>{
    console.log(work);
    return res.json(work);
  });
}
module.exports.getWorks = async (req, res) => {
  const workList = []
  Work.find({}).populate('assignment', null, {'slug': req.params.slug}).exec((err, works)=>{
    works.filter((work)=>{
      if(work.assignment !== null){
        workList.push(work);
      }
    });
    return res.json(workList);
  });
}

module.exports.getStudentWorks = async (req, res) => {
  const workList = []
  const user = await User.findById(req.user._id);
  console.log(user.login);
  Work.find({'owner.githubId': user.login.githubId}).populate('assignment').populate('subject').exec((err, works)=>{
    console.log(works);
    return res.json(works);
  });
}

module.exports.updateWork = async (req, res) => {
  Work.findByIdAndUpdate(req.body.id, { $set: { grade: req.body.grade, comment: req.body.comment, graded: true }}, { new: true }, (err, work)=>{
    if(err) console.log(err);
    return res.json(work);
  });
}