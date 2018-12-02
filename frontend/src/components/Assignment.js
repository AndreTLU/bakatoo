import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Badge, Divider, Spin, Button} from 'antd';
import '../styles/App.css';
import { log } from 'util';
import PropTypes from 'prop-types'

class Assignment extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.fetchAssignment();
    this.props.fetchWorks();
  }

  render(){
    const columns = [
      { title: 'Töö', dataIndex: 'title', key: 'title', render: (text, e)=> <Link to={`/teacher/homework/${e.slug}`}>{text}</Link> },
      { title: 'Esitaja', dataIndex: 'owner.login', key: 'owner.login', render: (text, e)=> <a target='_BLANK' href={e.owner.url}>{text}</a> },
      { title: 'Hinne', dataIndex: 'grade', key: 'grade' },
      { title: 'Hinnatud', dataIndex: '', key: 'x', render: (e)=> (e.graded) ? <Badge status="success" />: <Badge status="warning" /> }
    ];
    const { loading } = this.props.activeAssignment;
    let dataView, tableView;
    if(loading){
      dataView = <Spin />;
    }else{
      const { assignment, assignment:{ description, slug, url } } = this.props.activeAssignment;
      if(this.props.workList.loading){
        tableView = <Spin />
      }else{
        tableView = <Table columns={columns} dataSource={this.props.workList.works} size="small" />
      }
      dataView =<div>
        <Divider orientation="left"><h2>{description}</h2></Divider>
        {slug}<br></br>
        <a target='_BLANK' href={url}>{url}</a>
        <Divider orientation="left"><h3>Esitatud tööd</h3></Divider>
        {tableView}
      </div>;
    }
    return(
      <div>
        {dataView}
      </div>
    )
    
  }
}
Assignment.propTypes ={
    activeAssignment: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      assignment: PropTypes.shape({
        slug: PropTypes.string,
        url: PropTypes.string
      })
    })
}
export default Assignment;
