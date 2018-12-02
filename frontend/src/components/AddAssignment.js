import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Spin, Divider, Button, Select } from 'antd';
import { setToken } from '../utils/jwt';
import qs from 'query-string';
import '../styles/App.css';

class AddAssignment extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
  }

  componentDidMount(){
    this.props.loadSubjects();
  };

  handleSubjectChange(value) {
    console.log(value);
    this.props.fetchSubject(value);
    this.props.fetchRepos(value);
  }

  render(){
    let dataView;
    const {globalLoading} = this.props;
    const columns = [
      { title: 'Aine', dataIndex: 'description', key: 'subject', render: (text, e)=> <Link to={`/teacher/subject/${e.slug}`}>{text}</Link> },
      { title: 'Lisa', dataIndex: '', key: 'x', render: e=> <Button onClick={()=> this.props.saveAssignment(e, this.props.activeSubject.subject._id)} type="primary" size="small">Lisa</Button>}
    ];
    if(!this.props.assignmentList.assignments.length){
       dataView = <Spin />;
    }else{
      dataView = <div>
                    <Divider orientation="left"><h3>{this.props.activeSubject.subject.description}</h3></Divider>
                    <Table columns={columns} dataSource={this.props.assignmentList.assignments} expandedRowRender={record => 
                      <div><p style={{ margin: 0 }}>{record.url}</p><br></br>
                        <p style={{ margin: 0 }}>{record.slug}</p>
                      </div>}
                    />
                  </div>;
    }
    console.log(this.props);
  
    return(
      <div>
        <div>
        <Divider orientation="left"><h3>Lisa kodutöö</h3></Divider>
        <Select
          style={{ width: 120 }}
          onChange={this.handleSubjectChange}
        >
          {this.props.subjectList.subjects.map(subject => <Select.Option key={subject.key}>{subject.description}</Select.Option>)}
        </Select>
        </div>
        <div><br></br></div>
          {dataView}
      </div>
    )
  }
}

export default AddAssignment;
