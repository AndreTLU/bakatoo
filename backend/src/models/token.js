const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        token: { type: String, require: true, index: true},
        expires: { type: Date, expires: 60 }
    },
    { timestamps: true }
)

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token