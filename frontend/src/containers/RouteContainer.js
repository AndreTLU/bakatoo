import React from 'react'
import { connect } from 'react-redux'
import RouteWrap from '../components/RouteWrap'
import { checkUser} from '../actions/AuthActions'

const RouteContainer = props => <RouteWrap {...props} />

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    checkUser: () => dispatch(checkUser())
})

const defaultOpts = { restrict: false }

export default (Component, opts= defaultOpts) => {
    return connect(mapStateToProps, mapDispatchToProps)(
        props => <RouteContainer {...props} Component={Component} options={opts} />
    )
}