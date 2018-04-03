const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        profile: {
            name: { type: String },
            loginName: { type: String, require: true},
            email: { type: String }
        },
        login: {
            githubId: { type: String }
        },
        accessToken: { type: String }
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User