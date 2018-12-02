import React, {Component} from 'react';
import { Layout } from 'antd';
import '../styles/App.css';
const { Footer } = Layout;

class PageFooter extends Component {
  render(){
    return(
      <Footer style={{ textAlign: 'center', bottom: 0, left: 0, right: 0 }}>
        Õpikeskkond ©2018 Andre Post
      </Footer>
    )
  }
}
export default PageFooter;