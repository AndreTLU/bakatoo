import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Spin, Divider, Button} from 'antd';
import { setToken } from '../utils/jwt';
import qs from 'query-string';
import '../styles/App.css';

class AddSubject extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(dispatch){
    //this.setState({role: 'teacher'});
    this.props.loadGithubOrgs();
  }

  render(){
    const { loading } = this.props.subjectList;
    let view, dataView;
    const columns = [
      { title: 'Aine', dataIndex: 'description', key: 'subject', render: (text, e)=> <Link to={`/teacher/subject/${e.slug}`}>{text}</Link> },
      { title: 'Lisa', dataIndex: '', key: 'x', render: e=> <Button onClick={()=> this.props.saveSubject(e)} type="primary" size="small">Lisa</Button>}
    ];
    if(loading){
      dataView = <Spin />;
    }else{
      dataView = <Table columns={columns} dataSource={this.props.subjectList.subjects} size="small" />;
    }
    console.log(this.props);
    return(
      <div>
        <Divider orientation="left"><h3>Lisa aine Githubist</h3></Divider>
        <p>Githubi organisatsioonile tuleb anda õigused Githubist <a target='_BLANK' href='https://github.com/settings/connections/applications/e70bbdc96e673e18d51c'>SIIT</a></p>
        {dataView}
      </div>
    )
  }
}

export default AddSubject;
