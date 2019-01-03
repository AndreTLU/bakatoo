const { Api } = require('../utils/api');

const User = require('../models/user');
const Assignment = require('../models/assignment');
const Work = require('../models/work');
const Subject = require('../models/subject');

module.exports.saveSubject = async (req, res) => {
  console.log(req.body);
  const existingSubject = await Subject.findOne({key: req.body.key});
  if(!existingSubject){
    const newSubject = await new Subject({
        owner: req.user._id,
        key: req.body.key,
        description: req.body.description,
        slug: req.body.slug,
        url: req.body.url,
        repos_url: req.body.repos_url,
        assignments: [],
        works:[]
    }).save();
    res.status(200).send({message: 'Subject saved'});
  }else {
    res.status(500).send({message: 'Subject exists'});
  }
  
};

module.exports.getSubject = async (req, res) =>{
    const user = await User.findById(req.user._id);
    let subject = await Subject.findOne({key:req.params.id});
    if(subject){
        res.status(200).send(subject);
    }
    else {
        res.status(500).send({message: 'No subject was found'});
    }
};
module.exports.getSubjectBySlug = async (req, res) =>{
    const user = await User.findById(req.user._id);
    let subject = await Subject.findOne({slug:req.params.slug});
    if(subject){
        res.status(200).send(subject);
    }
    else {
        res.status(500).send({message: 'No subject was found'});
    }
};

module.exports.getSubjects = async (req, res) =>{
    const user = await User.findById(req.user._id);
    await Subject.find({owner:req.user._id}).populate('works').exec((err, subjects)=>{
        if(subjects){
            subjects.forEach(element => {
                element.graded = element.works.filter(obj => { return obj.graded===true}).length;
            });
            res.status(200).send(subjects);
        }
        else {
            res.status(500).send({message: 'No subjects found'});
        }
    });
    
};