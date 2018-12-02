import React, { Component } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import { Table, Badge, Divider, Tooltip, Spin } from 'antd';

class HomeworkTable extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.fetchStudentWorks();
  }

  render(){
    const columns = [
      { title: 'Esitatud töö', dataIndex: 'title', key: 'title', render: (text, e)=> <Link to={`/homework/${e.slug}`}>{text}</Link> },
      { title: 'Kodutöö', dataIndex: 'assignment.description', key: 'assignment.description' },
      { title: 'Aine', dataIndex: 'subject.description', key: 'subject.description' },
      { title: 'Hinne', dataIndex: 'grade', key: 'grade' },
      { title: 'Hinnatud', dataIndex: '', key: 'x', render: (e)=> (e.graded) ? <Badge status="success" />: <Badge status="processing" /> }
    ];
    let dataView;
    if(this.props.workList.loading){
      dataView = <Spin />;
    }else{
      dataView = <Table columns={columns} dataSource={this.props.workList.works} expandedRowRender={record => <p style={{ margin: 0 }}>{record.comment}</p>}/>
    }
    return(
      <div>
        <Divider orientation="left"><h3>Minu kodutööd</h3></Divider>
        {dataView}
      </div>
    )
  }
}

export default HomeworkTable;