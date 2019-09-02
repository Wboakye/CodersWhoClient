import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Login } from "./components/views/Login";

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="*" component={Login} />
        </Switch>
      </Router>
    </Provider>
  </div>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
