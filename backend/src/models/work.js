const mongoose = require('mongoose')

const workSchema = new mongoose.Schema(
    {
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        gId: String,
        subject: String,
        name: String,
        slug: String,
        url: String,
        grade: String
    },
    { timestamps: true }
)

const Work = mongoose.model('Work', workSchema)

module.exports = Work