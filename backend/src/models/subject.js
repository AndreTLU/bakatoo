const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        gId: String,
        description: String,
        slug: String,
        url: String,
        repos_url: String,
        assignments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Assignment'}],
        works: [{type: mongoose.Schema.Types.ObjectId, ref: 'Work'}]
    },
    { timestamps: true }
);

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;