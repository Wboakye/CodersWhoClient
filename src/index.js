import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/store.js';
import { Router, Route, Switch } from 'react-router';
import { Provider, connect } from 'react-redux';
import {PrivateRoute} from './components/PrivateRoute'

import io from 'socket.io-client'

import { verifyLoggedIn } from './actions/auth-actions' 

import Login from './components/views/Unauth/Login'
import Register from './components/views/Unauth/Register'
import Dashboard from './components/views/Auth/Dashboard'
import DashboardUnauth from './components/views/Unauth/DashboardUnauth'

import history from './history'

let socket = io.connect('http://localhost:80');
//const host = 'http://localhost:3005';


class Main extends React.Component {
    constructor(){
        super();
        this.state={
            
        }
    }

    //CONSOLE LOGGED PRICE DATA
    // componentDidMount(){
    //     socket.on('broadcast', function (data) {
    //         console.log(data);
    //     });
    // }

    componentWillUnmount(){
        socket.emit('end');
    }


    render(){
        return(<Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute path="/user" component={Dashboard} />
                    <Route path="/" component={DashboardUnauth} />
                    <Route path="/*" component={() => 'NOT FOUND'} />
                </Switch>
            </Router>
        </Provider>)
    }
}

  
  const mapDispatchToProps = (dispatch) => {
    return {
      verifyLoggedIn
    };
  }
  
  connect( mapDispatchToProps)(Login);

ReactDOM.render(
   < Main/>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//TODO: Get page auth working. Fix auth function in actions.
