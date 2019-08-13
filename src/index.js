import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/store.js';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';

import Login from './components/views/Login'
import Register from './components/views/Register'
import Dashboard from './components/views/Dashboard'

import history from './history'



ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" component={Dashboard} />
                <Route path="/*" component={() => 'NOT FOUND'} />
            </Switch>
        </Router>
    </Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//TODO: Get page auth working. Fix auth function in actions.
