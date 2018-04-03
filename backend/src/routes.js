const express = require('express')
const router = express.Router()
const passport = require('passport')
const asyncMiddleware = require('./utils/asyncMiddleware')
const auth = require('./controllers/auth')
const users = require('./controllers/users')
const orgs = require('./controllers/organizations')

const { jwtEnsure, jwtCheck } = require('./utils/jwt')

router.get('/auth/github', passport.authenticate('github', { scope: ['user', 'admin:org', 'repo']}))
router.get('/auth/github/oauth2callback', passport.authenticate('github', {failureRedirect: '/', session: false}), asyncMiddleware(auth.githubLogin))
router.post('/auth/logout', jwtEnsure, asyncMiddleware(auth.logout))

router.get('/users/me', jwtCheck, jwtEnsure, asyncMiddleware(users.getUser))
router.get('/users', jwtCheck, jwtEnsure, asyncMiddleware(users.getUsers))

router.get('/repos/:slug', jwtCheck, jwtEnsure, asyncMiddleware(orgs.getRepos))
router.get('/orgs/:slug', jwtCheck, jwtEnsure, asyncMiddleware(orgs.getOrgName))

router.get('/orgs/', jwtCheck, jwtEnsure, asyncMiddleware(orgs.getOrgs))

router.post('/assignments/', jwtCheck, jwtEnsure, asyncMiddleware(orgs.saveAssignment))
router.get('/assignments/:slug', jwtCheck, jwtEnsure, asyncMiddleware(orgs.getAssignments))
//router.post('/orgs', jwtCheck, jwtEnsure, asyncMiddleware(orgs.saveOrg))
module.exports = router
