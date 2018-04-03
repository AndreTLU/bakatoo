import React from 'react'
import { Table, Divider, Button} from 'antd'
import { Link } from 'react-router-dom'
import Api from '../utils/api'

class SubjectTable extends React.Component{
    constructor(props){
        super(props)
    }

    addAssignment(id){
        console.log(id)
        Api('POST', '/assignments', { data:id })
            .then((data) => {
                console.log(data)
            })
    }
    
    render(){
        const { data: { meta, slug } } = this.props
        console.log(this.props)
        let items = []
        meta.forEach(element => {
            items.push({
                key: element.id,
                name: element.name,
                url: element.url,
                desc: element.desc,
                owner: {
                    id: element.owner.id,
                    login: element.owner.login,
                    url: element.owner.html_url
                }
            })
        });
        const columns = [{
            title: 'Repo',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <a target="_blank" href={"https://github.com/"+slug + "/"+text}>{text} / {record.desc}</a>
        },{
            title: 'Lisa',
            key: 'lisa',
            render: (text, record) =>(
                <span>
                    <Button onClick={()=> this.addAssignment(record)}>Lisa</Button>
                </span>
            )
        }]
        return(
            <div>
                <div className='subject'>
                <Table columns={columns} dataSource={items}></Table>
                </div>
            </div>
        )
    }
}

export default SubjectTable