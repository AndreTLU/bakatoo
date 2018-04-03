import React from 'react'
import { render } from 'react-dom'
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import './styles/main.scss'

import HomeContainer from './containers/HomeContainer'
import RouteContainer from './containers/RouteContainer'
import HeaderWrapContainer from './containers/HeaderContainer'
import SubjectContainer from './containers/SubjectContainer'

import { Layout, LocaleProvider } from 'antd'
const { Content, Footer } = Layout

render (
    <Provider store={store}>
        <BrowserRouter history={browserHistory}>
            <Layout>
                <Route component={HeaderWrapContainer}/>
                <Content>
                    <div id='content-wrapper'>
                        <Switch>
                            <Route exact path='/' component={RouteContainer(HomeContainer)}/>
                            <Route path='/subject/:slug' component={RouteContainer(SubjectContainer)} />
                            <Route path='/subject/:slug/:assign' component={RouteContainer(SubjectContainer)} />
                        </Switch>
                    </div>
                </Content>
            </Layout>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#main')
)