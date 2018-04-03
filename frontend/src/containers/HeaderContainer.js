import React from 'react'
import { connect } from 'react-redux'
import HeaderWrap from '../components/HeaderWrap'
import { logout } from '../actions/AuthActions'

const HeaderWrapContainer = props => <HeaderWrap {...props} />

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(HeaderWrapContainer)