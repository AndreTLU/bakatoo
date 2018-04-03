import React from 'react'
import { Table, Divider, Tabs } from 'antd'
import SubjectTable from './SubjectTable'
import AssignementTable from './AssignementTable'

class Assignement extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount (){
        this.props.getWorks()
    }
    
    render(){
        console.log(this.props)

        return(
            <div>
                
            </div>
        )
    }
}

export default Assignement