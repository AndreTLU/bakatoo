const mongoose = require('mongoose');

const workSchema = new mongoose.Schema(
	{
    owner: {
      githubId: String,
      login: String,
      url: String
    },
    title: String,
    key: String,
    subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
    state: String,
    slug: String,
    url: String,
    assignment: {type: mongoose.Schema.Types.ObjectId, ref:'Assignment', required:true },
    grade: String,
    graded: Boolean,
    comment: String
	},
	{ timestamps: true }
);

const Work = mongoose.model('Work', workSchema);

module.exports = Work;