import React from 'react'
import { render } from 'react-dom'
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import HomeContainer from './containers/HomeContainer'

render (
    <Provider store={store}>
        <BrowserRouter history={browserHistory}>
            <div id='content-wrapper'>
                <Switch>
                    <Route exact path='/' restrict component={HomeContainer}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#main')
)