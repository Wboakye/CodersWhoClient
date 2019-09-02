import React, { useEffect } from "react";
import store from "../../redux/store";
import axios from "axios";
import { setUser } from "../../actions/user-actions";
import { setLogged } from "../../actions/auth-actions";

const jwtDecode = require("jwt-decode");

const host = "http://localhost:3005";

const OpenRoute = ({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) => {
  const [state, setState] = React.useState({
    isAuthenticated: false,
    isLoading: true
  });

  const getUser = () => {
    let token = sessionStorage.getItem("CWJWT");
    let decodedToken = jwtDecode(token);
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

  useEffect((...rest) => {
    //IF ALREADY AUTHENTICATED IN STORE, AUTHENTICATED
    if (store.getState().auth.isLoginSuccess) {
      setState({ isAuthenticated: true, isLoading: false });
      return <Component {...rest} />;
    } else {
      //IF JWT AVAILABLE, VALIDATE
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
            return <Component {...rest} />;
          });
      } else {
        setState({ ...state, isLoading: false });
        return <Component {...rest} />;
      }
    }
  }, []);

  if (state.isLoading) {
  }
  if (!store.getState().auth.isLoginSuccess) {
    return <Component {...rest} />;
  }
  return <Component {...rest} />;
};

export { OpenRoute };
