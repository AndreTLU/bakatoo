const express = require('express')
const router = express.Router()
const passport = require('passport')
const asyncMiddleware = require('./utils/asyncMiddleware')
const auth = require('./controllers/auth')
const users = require('./controllers/users')

const { jwtEnsure, jwtCheck } = require('./utils/jwt')

router.get('/auth/github', passport.authenticate('github', { scope: ['user', 'read:org']}))
router.get('/auth/github/oauth2callback', passport.authenticate('github', {failureRedirect: '/', session: false}), asyncMiddleware(auth.githubLogin))
router.post('/auth/logout', jwtEnsure, asyncMiddleware(auth.logout))

router.get('/users/me', jwtCheck, jwtEnsure, asyncMiddleware(users.getUser))
//router.get('/users', jwtCheck, jwtEnsure, asyncMiddleware(users.getUsers))

router.get('/orgs/me', asyncMiddleware(users.getOrgs))
module.exports = router
