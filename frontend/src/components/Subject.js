import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Badge, Divider, Spin} from 'antd';
import { setToken } from '../utils/jwt';
import qs from 'query-string';
import '../styles/App.css';

class Subject extends Component{
  constructor(props){
    super(props);
    this.state = {subject: {}};
  }

  componentWillMount(){
    this.props.fetchSubject((data) => {
      this.setState({subject: data});
    });
    this.props.fetchAssignments();
    
    //this.props.loadSubjects();
    // this.props.loadSubjects((data)=>{
    //   this.setState({subjectData: data});
    // });
  }

  render(){
    const { loading } = this.props.activeSubject;
    let view, dataView;
    const columns = [
      { title: 'Töö', dataIndex: 'description', key: 'description', render: (text, e)=> <Link to={`/teacher/assignment/${e.slug}`}>{text}</Link> },
      { title: '', dataIndex: 'slug', key:'slug'},
      { title: 'Github', dataIndex: 'url', key: 'url', render: (text, e)=> <a target='_BLANK' href={e.url}>{text}</a> }
    ];
    console.log(`PROPS`)
    console.log(this.props);
    if(!this.props.assignmentList.assignments.length){
      dataView = <Spin />;
    }
    else {
      dataView = <Table columns={columns} dataSource={this.props.assignmentList.assignments} size="small" />;
    }

    return(
      <div>
        {!loading && <div>
          <Divider orientation="left"><h2>{this.state.subject.description}</h2></Divider>
          <a target='_BLANK' href={this.state.subject.url}>{this.state.subject.url}</a>
          </div>
        }
        {!this.props.assignmentList.loading && 
          <div>
            <Divider orientation="left"><h3>Kodutööde nimekiri</h3></Divider>
            {dataView}
          </div>
        }
      </div>
    )
    
  }
}

export default Subject;
