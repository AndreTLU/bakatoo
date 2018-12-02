import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Badge, Divider, Spin, Button} from 'antd';
import '../styles/App.css';
import { log } from 'util';
import PropTypes from 'prop-types'

class Homework extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.fetchStudentWorks();
  }

  render(){
    const columns = [
      { title: 'Tiitle', dataIndex: 'title', key: 'title', render: (text, e)=> <Link to={`/teacher/homework/${e.slug}`}>{text}</Link> },
      { title: 'Töö', dataIndex: '', key: 'a', render: (e)=> {e.assingment.description} },
      { title: 'Aine', dataIndex: '', key: 's', render: (e)=> {e.subject.description} },
      { title: 'Hinnatud', dataIndex: '', key: 'x', render: (e)=> (e.graded) ? <Badge status="success" />: <Badge status="warning" /> },
      { title: 'Hinne', dataIndex: 'grade', key: 'grade' }
    ];
    return(
      <div>
      </div>
    )
    
  }
}
export default Homework;
