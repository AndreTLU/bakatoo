import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Badge, Divider, Spin} from 'antd';
import { setToken } from '../utils/jwt';
import qs from 'query-string';
import '../styles/App.css';

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.setState({role: 'teacher'});
    this.props.loadSubjects();
    // this.props.loadSubjects((data)=>{
    //   this.setState({subjectData: data});
    // });
  }

  componentWillMount(){
    const { token } = qs.parse(this.props.history.location.search, {
      arrayFormat: 'bracket'
    });
    if(token){
      setToken(token);
      // window.setTimeout(()=>{
      //     window.opener.location.reload(true);
      //     window.close();
      // }, 1000);
  }
  }

  render(){
    const { role } = this.state;
    console.log('STATE')
    console.log(this.state);
    // const {
    //   auth: {
    //     isAuthenticated,
    //     user:{
    //         profile
    //     }
    //   },
    //   home:{loading, subjects}
    // } = this.props
    let view, dataView;
    const columns = [
      { title: 'Aine', dataIndex: 'description', key: 'subject', render: (text, e)=> <Link to={`/teacher/subject/${e.slug}`}>{text}</Link> },
      { title: 'Õpilasi', dataIndex: 'users', key: 'users' },
      { title: 'Töid', dataIndex: 'assignments', key: 'assignments', render: (e) => {if(e.assignments !=null){ return Object.keys(e.assignmets).length; }else { return 0;}} },
      { title: 'Esitatud', dataIndex: 'submitted', key: 'submitted' },
      { title: 'Hinnatud', dataIndex: 'graded', key: 'graded' },
      { title: 'Staatus', dataIndex: '', key: 'x', render: (e)=> (e.graded < e.submitted) ? <Badge status="warning" />: <Badge status="success" />}
    ];
    if(role=='student'){
      view = <Divider orientation="left"><h3>Minu Ained (Õpilase vaade)</h3></Divider>;
    }else{
      view = <Divider orientation="left"><h3>Minu Ained (Õpetaja vaade)</h3></Divider>;
    }
    // if(loading){
    //   dataView = <Spin />;
    // }else{
      dataView = <Table columns={columns} dataSource={this.props.subjectList.subjects} size="small" />;
    //}
    console.log(`PROPS`)
    console.log(this.props);
    return(
      <div>
        {view}
        {dataView}
      </div>
    )
  }
}

export default Home;
