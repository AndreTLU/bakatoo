const express = require('express')
const router = express.Router()
const passport = require('passport')
const asyncMiddleware = require('./utils/asyncMiddleware')
const auth = require('./controllers/auth')

router.get('/auth/github', passport.authenticate('github', { scope: ['user']}))
router.get('/auth/github/oauth2callback', passport.authenticate('github', {failureRedirect: '/', session: false}), asyncMiddleware(auth.githubLogin))

module.exports = router
