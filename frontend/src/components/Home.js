import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { getToken, setToken } from '../utils/jwt'
import { Button } from 'antd'

import  HomeSubjects  from './HomeSubjects'

class Home extends React.Component {
    constructor(props){
        super(props)
        
    }

    componentWillMount(){
        console.log(this.props)
        const { token } = queryString.parse(this.props.history.location.search, {
            arrayFormat: 'bracket'
        })

        if(token){
            setToken(token)
            window.setTimeout(()=>{
                window.opener.location.reload(true)
                window.close()
            }, 1000)
        }       
    }
    componentDidMount(){
        this.props.getSubjects()
    }

    

    render(){
        const { 
            auth: {
                isAuthenticated, 
                user:{
                    profile
                }
            },
            home:{loading, subjects}
        } = this.props
        console.log(subjects)
        return(
            <div>
                <h1>Githubi põhine õpikeskkond</h1>
                {isAuthenticated && 
                    <h2>Tere, {profile.name}!</h2>
                }
                {!loading && <HomeSubjects subjects={subjects}/>}
            </div>
        )
    }
}
export default Home