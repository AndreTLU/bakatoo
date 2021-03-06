const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        gId: String,
        subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        name: String,
        slug: String,
        url: String,
        grading: { type: Boolean, required: true },
        deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;