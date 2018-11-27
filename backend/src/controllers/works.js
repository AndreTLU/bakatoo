const { Api } = require('../utils/api');

const User = require('../models/user');
const Work = require('../models/work');

module.exports.getWork = async (req, res) => {
  console.log(`Getting single Homework data for: ${req.params.id}`);
  const workList = []
  Work.findById(req.params.id).populate('owner').exec((err, work)=>{
    console.log(work);
    return res.json(work);
  });
}
