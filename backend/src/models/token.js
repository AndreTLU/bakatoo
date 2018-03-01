const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        token: { type: String, require: true, index: true},
        expires: { type: Data, expires: 60 }
    },
    { timestamps: true }
)

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token