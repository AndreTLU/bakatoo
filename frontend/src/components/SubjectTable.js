import React, { Component } from 'react';
import { Table, Badge, Divider, Spin} from 'antd';
import '../styles/App.css';

class SubjectTable extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    this.setState({loading:false});
  }
  render(){
    console.log(this.state.loading);
    const loading = this.state.loading;
    const columns = [
      { title: 'Aine', dataIndex: 'subject', key: 'subject', render: text=> <a href={text}>{text}</a>},
      { title: 'Õpilasi', dataIndex: 'users', key: 'users' },
      { title: 'Töid', dataIndex: 'tasks', key: 'tasks' },
      { title: 'Esitatud', dataIndex: 'submitted', key: 'submitted' },
      { title: 'Hinnatud', dataIndex: 'graded', key: 'graded' },
      { title: 'Staatus', dataIndex: '', key: 'x', render: (e)=> (e.graded < e.submitted) ? <Badge status="warning" />: <Badge status="success" />}
    ];
    const data = [
      { key: 1, subject: '.NET Rakendused Kevad', users:'32', tasks: '5', submitted:'86', graded:'85'},
      { key: 2, subject: 'Unity Kevad', users:'45', tasks: '6', submitted:'182', graded:'182'},
      { key: 3, subject: 'Programmeerimise põhikursus Sügis', users:'24', tasks: '3', submitted:'47', graded:'35'},
      { key: 4, subject: 'C++ Kevad', users:'17', tasks: '1', submitted:'17', graded:'17'},
      { key: 5, subject: 'Programmeerimise alused Sügis', users:'21', tasks: '2', submitted:'37', graded:'32'}
    ];

    return(
      <div>
        <Divider orientation="left"><h3>Minu Ained (Õpetaja vaade)</h3></Divider>
        {loading ? (<Spin />): (<Table columns={columns} dataSource={data} size="small" />)}
      </div> 
    )
  }
}

export default SubjectTable;