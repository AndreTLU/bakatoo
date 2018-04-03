import React from 'react'
import { Table, Divider, Button} from 'antd'
import { Link } from 'react-router-dom'
import Api from '../utils/api'

class AssignmentTable extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const { data: {meta, slug} } = this.props
        console.log(this.props)
        let items = []
        meta.forEach(element => {
            items.push({
                key: element.gId,
                name: element.name,
                url: element.url,
                slug: element.slug
            })
        });
        const columns = [{
            title: 'Ülesanne',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <a href={"/subject/"+slug+"/"+record.slug}>{text}</a>
        }]
        return(
            <div>
                <div className='assignment'>
                <Table columns={columns} dataSource={items}></Table>
                </div>
            </div>
        )
    }
}

export default AssignmentTable