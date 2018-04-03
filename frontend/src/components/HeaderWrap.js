import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Button, Menu } from 'antd'

const { Header } = Layout

class HeaderWrap extends React.Component {
    constructor (props){
        super(props)
        this.startGithubLogin = this.startGithubLogin.bind(this)
    }

    startGithubLogin() {
        const url = window.location.origin + '/api/auth/github'
        window.open(url, 'name', 'height=600,width=450')
    }

    render(){
        const {
            auth: { 
                isAuthenticated,
                user: {
                    profile
                }
            }
        } = this.props

        return (
            <Header className="header">     
                <div className='logo'><Link to='/'>Õpikeskkond</Link></div>
                {isAuthenticated && 
                    <div className='login'>
                        <div className='user'>{profile.name}</div>
                        <Button onClick={this.props.logout} ghost title='Logout'>Logout</Button>
                    </div>
                }
                {!isAuthenticated &&
                    <div className='login'>
                        <Button ghost htmlType='submit' onClick={this.startGithubLogin}>Login</Button>
                    </div>
                }
                
            </Header>
        )
    }
}

export default HeaderWrap