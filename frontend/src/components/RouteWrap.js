import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

const { bool, func, shape, string } = PropTypes

class RouteWrap extends React.Component {
    constructor (props){
        super(props)
        this.state = { allowPageLoad: false }
        console.log(this.props)
    }

    componentDidMount() {
        this.props.checkUser()
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.auth.authInProgress === true &&
            nextProps.auth.authInProgress === false) {
          // auth finished, allow to load page
          this.setState({ allowPageLoad: true })
        }
    }
    render() {
        const { allowPageLoad } = this.state
        const { 
            auth: { isAuthenticated },
            location: { pathname },
            Component,
            options: { restrict }
        } = this.props

        if(restrict && !isAuthenticated && allowPageLoad){
            const redirect = {
                pathname: '/',
                search: '?redirect='+pathname
            }

            return <Redirect to={redirect} />
        } else if(allowPageLoad){
            return <Component {...this.props} />
        } else{
            return null
        }
    }
}

export default RouteWrap