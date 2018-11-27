const express = require('express');
const router = express.Router();
const passport = require('passport');
const asyncMiddleware = require('./utils/asyncMiddleware');
const auth = require('./controllers/auth');
const users = require('./controllers/users');
const orgs = require('./controllers/organizations');
const subjects = require('./controllers/subjects');
const works = require('./controllers/works');

const { jwtEnsure, jwtCheck } = require('./utils/jwt')

router.get('/auth/github', passport.authenticate('github', { scope: ['user', 'admin:org', 'repo']}));
router.get('/auth/github/oauth2callback', passport.authenticate('github', {failureRedirect: '/', session: false}), asyncMiddleware(auth.githubLogin));
router.post('/auth/logout', jwtEnsure, asyncMiddleware(auth.logout));

router.get('/users/me', jwtCheck, jwtEnsure, asyncMiddleware(users.getUser));
router.get('/users', jwtCheck, jwtEnsure, asyncMiddleware(users.getUsers));

router.get('/repos/:slug', jwtCheck, jwtEnsure, asyncMiddleware(orgs.getRepos));
router.get('/orgs/:slug', jwtCheck, jwtEnsure, asyncMiddleware(orgs.getOrgName));
router.get('/orgs/', jwtCheck, jwtEnsure, asyncMiddleware(orgs.getOrgs))

router.get('/assignment/:slug', asyncMiddleware(orgs.getAssignment))
router.post('/assignments/', jwtCheck, jwtEnsure, asyncMiddleware(orgs.saveAssignment));
router.get('/assignments/:slug', jwtCheck, jwtEnsure, asyncMiddleware(orgs.getAssignments));

router.get('/work/:slug', jwtCheck, jwtEnsure, asyncMiddleware(works.getWork));
router.put('/work/', jwtCheck, jwtEnsure, asyncMiddleware(works.updateWork));
router.get('/works/', jwtCheck, jwtEnsure, asyncMiddleware(works.getStudentWorks));
router.get('/works/:slug', jwtCheck, jwtEnsure, asyncMiddleware(works.getWorks));

router.get('/subject/:id', jwtCheck, jwtEnsure, asyncMiddleware(subjects.getSubject));
router.get('/subject/slug/:slug', jwtCheck, jwtEnsure, asyncMiddleware(subjects.getSubjectBySlug));
router.post('/subjects/', jwtCheck, jwtEnsure, asyncMiddleware(subjects.saveSubject));
router.get('/subjects/', jwtCheck, jwtEnsure, asyncMiddleware(subjects.getSubjects));
//router.post('/orgs', jwtCheck, jwtEnsure, asyncMiddleware(orgs.saveOrg))
module.exports = router;
