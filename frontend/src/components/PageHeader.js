import React, {Component} from 'react';
import { Layout } from 'antd';
import '../styles/App.css';
const { Header } = Layout;

class PageHeader extends Component {
  render(){
    return(
      <Header style={{ background: '#fff', padding: 0 }}>
        <div>
          <h1 style={{marginLeft: '1em', float:'left'}}>Õpikeskkond DEV</h1>
        </div>
        <div style={{float:'right', marginRight:'2em'}}>
          <h3>Andre Post</h3>
        </div>
      </Header>
    )
  }
}
export default PageHeader;