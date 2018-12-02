import React, {Component} from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideMenu extends Component{
  constructor(props) {
    super(props);
    this.startGithubLogin = this.startGithubLogin.bind(this);
  }

  startGithubLogin() {
    const url = window.location.origin + '/api/auth/github';
    window.open(url, 'name', 'height=600,width=450');
  }

  render(){
    return(
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <div className="logo"></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['']}>
        <Menu.Item key="1">
            <Icon type="home" />
            <Link to='/' style={{display: 'inline'}}><span className="nav-text">Home</span></Link>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="user" /><span>Õpilase vaade</span></span>}>
            <Menu.Item key="11"><Link to='/subjects' style={{display: 'inline'}}>Minu ained</Link></Menu.Item>
            <Menu.Item key="12"><Link to='/homework' style={{display: 'inline'}}>Minu kodutööd</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="audit" /><span>Õpetaja vaade</span></span>}>
            <Menu.Item key="21"><Link to='/teacher/assignments/add' style={{display: 'inline'}}>Lisa kodutöö</Link></Menu.Item>
            <Menu.Item key="22"><Link to='/teacher/subject/add' style={{display: 'inline'}}>Lisa aine</Link></Menu.Item>
            <Menu.Item key="23"><Link to='/teacher/subjects' style={{display: 'inline'}}>Ained</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="2" onClick={this.startGithubLogin}>
            <Icon type="login" />
            <span className="nav-text">Logi sisse</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}
export default SideMenu;