import React from 'react'
import { render } from 'react-dom'
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom'
import { Provider } from 'react-redux'


render (
    <Provider>
        <BrowserRouter history={browserHistory}>
            <div id='content-wrapper'>
                <Switch>
                <Route exact path='/' restrict />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
)