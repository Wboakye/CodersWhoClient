import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import store from "../../redux/store";
import axios from "axios";
import { setUser } from "../../actions/user-actions";
import { setLogged } from "../../actions/auth-actions";

const jwtDecode = require("jwt-decode");

const host = process.env.REACT_APP_API_HOST;

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) => {
  const [state, setState] = React.useState({
    isAuthenticated: false,
    isLoading: true
  });

  //GET USER INFO, SAVE IN STORE
  const getUser = () => {
    const token = sessionStorage.getItem("CWJWT");
    const decodedToken = jwtDecode(token);
    axios({
      url: host + "/api/user/profile",
      method: "POST",
      headers: {
        "auth-token": token
      },
      data: { userId: decodedToken._id }
    })
      .then(response => {
        store.dispatch(setUser(response.data.body));
      })
      .catch(function(error) {
        alert(error);
      });
  };

  const checkJwtAndValidate = (...rest) => {
    if (sessionStorage.getItem("CWJWT")) {
      let token = sessionStorage.getItem("CWJWT");
      axios({
        url: host + "/api/user/authenticate",
        method: "POST",
        headers: {
          "auth-token": token
        }
      })
        .then(response => {
          //IF AUTHENTICATED, GET AND STORE INFO
          if (response.data.success === true) {
            getUser();
          }
          setState({ ...state, isAuthenticated: response.data.success });
          store.dispatch(setLogged(true));
          setState({ ...state, isLoading: false });
          return <Component {...rest} />;
        })
        .catch(function(error) {
          alert(error);

          setState({ isLoading: false });
          return <Redirect to="/login" />;
        });
    } else {
      setState({ ...state, isLoading: false });
      return <Redirect to="/login" />;
    }
  };

  const validate = (...rest) => {
    //IF ALREADY AUTHENTICATED IN STORE, AUTHENTICATED
    if (store.getState().auth.isLoginSuccess) {
      setState({ isAuthenticated: true, isLoading: false });
      return <Component {...rest} />;
    } else {
      //IF JWT AVAILABLE, VALIDATE
      checkJwtAndValidate();
    }
  };

  useEffect(
    (...rest) => {
      validate(...rest);
    },
    state,
    []
  );

  if (state.isLoading) {
  }
  if (!store.getState().auth.isLoginSuccess) {
    return <Redirect to="/login" />;
  }
  return <Component {...rest} />;
};

export { PrivateRoute };
