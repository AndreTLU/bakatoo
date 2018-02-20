import React from 'react'
import { render } from 'react-dom'
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom'

import Home from './components/Home'
import Words from './components/Words'
import Projects from './components/Projects'
import NotFound from './components/NotFound'

import './app.scss'

render(
  <BrowserRouter history={browserHistory}>
    <div id='content-wrapper'>
      <Switch>
        <Route exact path='/' restrict component={Home} />
        <Route exact path='/words' component={Words} />
        <Route exact path='/projects' component={Projects} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.querySelector('#main')
)
