import React from 'react'
import { Table, Divider, Tabs } from 'antd'
import SubjectTable from './SubjectTable'
import AssignmentTable from './AssignmentTable'

class Subject extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount (){
        this.props.getSubjectName()
        this.props.getSubject()
        this.props.getAssignments()
    }
    
    render(){
        const TabPane = Tabs.TabPane;
        const { subject: { meta, title, data }, loading } = this.props
        const prop = {
            meta: meta,
            slug: this.props.match.params.slug
        }
        const assignements = {
            meta: data,
            slug: this.props.match.params.slug
        }
        return(
            <div>
                {!loading && 
                    <div>
                        <div>
                            <h1>{title.toString()}</h1>
                        </div>
                        <Tabs defaultActiveKey='1'>
                            <TabPane tab='Salvestatud tööd' key='1'>
                                <AssignmentTable data={assignements}/>
                            </TabPane>
                            <TabPane tab='Lisa töid' key='2'>
                            <div className='subject'>
                                <SubjectTable data={prop}/>
                            </div>
                            </TabPane>
                        </Tabs>
                        
                    </div> 
                }
            </div>
        )
    }
}

export default Subject