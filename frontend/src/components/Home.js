import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

class Home extends React.Component {
    constructor(props){
        super(props)
        this.startGithubLogin = this.startGithubLogin.bind(this)
    }

    componentWillMount(){
        console.log(this.props)
    }

    startGithubLogin(){
        const url = window.location.origin + '/api/auth/github'
        window.open(url, 'name', 'height=600,width=450')
    }

    render(){
        return(
            <div>
                <h1>Githubi põhine õpikeskkond</h1>
                <Button htmlType='submit' onClick={this.startGithubLogin}>Github Login</Button>
            </div>
        )
    }
}
export default Home