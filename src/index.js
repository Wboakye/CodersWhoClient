import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store.js";
import { Router, Route, Switch } from "react-router";
import { Provider, connect } from "react-redux";
import { OpenRoute } from "./components/rerouting/OpenRoute";

import { verifyLoggedIn } from "./actions/auth-actions";

import Login from "./components/views/Login";
import Dashboard from "./components/Dashboard";

import history from "./history";

require("dotenv").config();

class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log(process.env.REACT_APP_API_HOST);
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <OpenRoute path="/" component={Dashboard} />
            <Route path="/*" component={() => "NOT FOUND"} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyLoggedIn
  };
};

connect(mapDispatchToProps)(Login);

ReactDOM.render(
  <Main />,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//import io from "socket.io-client";
//let socket = io.connect("http://localhost:80");
//const host = process.env.REACT_APP_API_HOST;

//CONSOLE LOGGED PRICE DATA
// componentDidMount(){
//     socket.on('broadcast', function (data) {
//         console.log(data);
//     });
// }

// componentWillUnmount() {
//   socket.emit("end");
// }
