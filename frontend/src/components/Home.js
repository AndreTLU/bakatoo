import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { getToken, setToken } from '../utils/jwt'
import { Button } from 'antd'

class Home extends React.Component {
    constructor(props){
        super(props)
        this.startGithubLogin = this.startGithubLogin.bind(this)
    }

    componentWillMount(){
        console.log(this.props)
        const { token } = queryString.parse(this.props.history.location.search, {
            arrayFormat: 'bracket'
        })
        console.log(token)

        if(token){
            setToken(token)
            window.setTimeout(()=>{
                window.opener.location.reload(true)
                window.close()
            }, 2000)
        }
        
    }

    startGithubLogin() {
        const url = window.location.origin + '/api/auth/github'
        window.open(url, 'name', 'height=600,width=450')
    }

    render(){
        const { 
            auth: {
                isAuthenticated, 
                user:{
                    profile
                }
            },
            loading
        } = this.props
        const showName = isAuthenticated
        return(
            <div>
                <h1>Githubi põhine õpikeskkond</h1>
                {showName && 
                    <h2>Tere, {profile.name}!</h2>
                }
                {isAuthenticated && <a href='' onClick={this.props.logout}>Log out</a>}
                {!isAuthenticated && <Button htmlType='submit' onClick={this.startGithubLogin}>Github Login</Button>}
            </div>
        )
    }
}
export default Home