import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store.js';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import Login from './components/views/Login'
import Register from './components/views/Register'


const history = createHistory();



ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/login:*" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/*" component={() => 'NOT FOUND'} />
            </Switch>
        </Router>
    </Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
