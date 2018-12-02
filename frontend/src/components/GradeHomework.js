import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Divider, Spin, Input} from 'antd';
import qs from 'query-string';
import '../styles/App.css';
const FormItem = Form.Item;

class Homework extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    this.props.fetchHomework();
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) =>{
      if(!err){
        console.log(values);
        values.id = this.props.activeWork.work._id;
        this.props.gradeHomework(values);
        this.props.fetchHomework();
      }
    });
  }

  render(){
    const { loading } = this.props.activeSubject;
    const { getFieldDecorator } = this.props.form;
    let view, dataView;
    const columns = [
      { title: 'Töö', dataIndex: 'slug', key: 'slug', render: (text, e)=> <Link to={`/teacher/assignment/${e.slug}`}>{text}</Link> },
      { title: 'Github', dataIndex: 'url', key: 'url', render: (text, e)=> <a target='_BLANK' href={e.url}>{text}</a> }
    ];
    console.log(`PROPS`)
    console.log(this.props);
    if(!this.props.activeWork.work){
      dataView = <Spin />;
    }
    else {
      dataView =  <div><Divider orientation="left"><h3>{this.props.activeWork.work.title}</h3></Divider>
                    <div style={{textAlign:'left'}}>              
                      <p>Githubi link: <a target="_BLANK" href={this.props.activeWork.work.url}>{this.props.activeWork.work.url}</a></p>
                      <p>Autor: <a target="_BLANK" href={this.props.activeWork.work.owner.url}>{this.props.activeWork.work.owner.login}</a></p>
                      <p>Hinne: {this.props.activeWork.work.grade}</p>
                      <p>Kommentaar: {this.props.activeWork.work.comment}</p>
                    </div>
                    <div>
                      <Form onSubmit={this.handleSubmit} layout="inline">
                        <FormItem label="Kommentaar">
                        {getFieldDecorator('comment', {
                          rules: [{ required: false, message: 'Sisestage kommentaar' }],
                        })(
                          <Input placeholder="Kommentaar" />
                        )}
                        </FormItem>
                        <FormItem label="Hinne">
                        {getFieldDecorator('grade', {
                          rules: [{ required: true, message: 'Sisestage hinne' }],
                        })(
                          <Input placeholder="Hinne" />
                        )}
                        </FormItem>
                        <FormItem >
                          <Button type="primary" htmlType="submit">Hinda</Button>
                        </FormItem>
                      </Form>
                    </div>
                  </div>;
    }

    return(
      <div>
        {dataView}
      </div>
    )
    
  }
}

export default Form.create()(Homework);
