import React from 'react'
import { connect } from 'react-redux'

import Assignement from '../components/Assignement'

const AssignementContainer = props => <Assignement {...props} />

const mapStateToProps = state => ({
    auth: state.auth,
    assignement: state.assignement
})

const mapDispatchToProps = (dispatch, props) => ({
    getWorks: () => dispatch(getWorks(props.match.params.assign)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignementContainer)