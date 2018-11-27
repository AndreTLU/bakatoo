import React, {Component} from 'react';
import { Layout, Spin } from 'antd';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import './styles/App.css';

import RouteContainer from './utils/RouteContainer';

import HomeContainer from './containers/HomeContainer';
import AddSubjectContainer from './containers/AddSubjectContainer';
import AddAssignmentContainer from './containers/AddAssignmentContainer';
import SubjectListContainer from './containers/SubjectListContainer';
import SubjectContainer from './containers/SubjectContainer';
import AssignmentContainer from './containers/AssignmentContainer';
import GradeHomeworkContainer from './containers/GradeHomeworkContainer';
import HomeworkTableContainer from './containers/HomeworkTableContainer';

import HomeworkTable from './components/HomeworkTable';
import SideMenu from './components/SideMenu';
import PageFooter from './components/PageFooter';
import PageHeader from './components/PageHeader';

const { Content } = Layout;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.setState({loading: false, authenticated: false});
  }
  
  render(){
    const {loading, authenticated} = this.state;
    function Homeview (){
    
    } 
    return(
      <div>
        {!authenticated}
        {loading ? (<Spin  size="large" style={{textAlign: 'center', marginLeft: '50%', flex: 1, paddingTop: '15em'}}/>):(
        <Provider store={store}>
          <BrowserRouter>
            <Layout style={{height:"100%"}}>
              <SideMenu />
              <Layout style={{ marginLeft: 200,minHeight: '100vh' }} className='content'>
                <PageHeader />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', }}>
                  <div style={{ padding: 24, background: '#fff', minHeight: 360, textAlign: 'center' }}>
                    <Switch>
                      <Route exact path='/' component={RouteContainer(SubjectListContainer)}/>
                      <Route path='/homework' component={RouteContainer(HomeworkTableContainer)}/>
                      <Route path='/homework/:slug' component={HomeworkTable}/>
                      <Route path='/subjects' component={RouteContainer(HomeContainer)}/>
                      <Route path='/teacher/assignment/:slug' component={RouteContainer(AssignmentContainer)}/>
                      <Route path='/teacher/subject/add' component={RouteContainer(AddSubjectContainer)}/>
                      <Route path='/teacher/subject/:slug' component={RouteContainer(SubjectContainer)}/>    
                      <Route path='/teacher/assignments/add' component={RouteContainer(AddAssignmentContainer)}/>
                      <Route path='/teacher/subjects' component={RouteContainer(SubjectListContainer)}/>
                      <Route path='/teacher/homework/:slug' component={RouteContainer(GradeHomeworkContainer)}/>
                    </Switch>
                  </div>
                </Content>
                <PageFooter />
              </Layout>
            </Layout>
          </BrowserRouter>
        </Provider>)}
      </div>
    )
  }
}

export default App;
