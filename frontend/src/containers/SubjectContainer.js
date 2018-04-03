import React from 'react'
import { connect } from 'react-redux'

import Subject from '../components/Subject'

import { getSubject, getSubjectName } from '../actions/SubjectActions'
import { getAssignments } from '../actions/AssignmentActions'

const SubjectContainer = props => <Subject {...props} />

const mapStateToProps = state => ({
    auth: state.auth,
    subject: state.subject
})

const mapDispatchToProps = (dispatch, props) => ({
    getSubject: () => dispatch(getSubject(props.match.params.slug)),
    getSubjectName: () => dispatch(getSubjectName(props.match.params.slug)),
    getAssignments: () => dispatch(getAssignments(props.match.params.slug))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubjectContainer)