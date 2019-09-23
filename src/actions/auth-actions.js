import axios from "axios";

import history from "../history";

import * as c from "../redux/constants";
import store from "../redux/store";
import { setUser } from "./user-actions";

const jwtDecode = require("jwt-decode");
const host = process.env.REACT_APP_API_HOST;

//LOGIN

export function register(userInfo) {
  return dispatch => {
    callRegisterApi(userInfo, (data, error) => {
      if (!error) {
        console.log(data);
        if (data.success === true) {
          dispatch(setUserToken(data.token));
          dispatch(setLoginSuccess(true));
          //GET PROFILE INFORMATION, STORE IN REDUX STORE
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
              history.push("/home");
            })
            .catch(function(error) {
              alert(error);
              console.log("ERROR");
            });
        } else {
          dispatch(setLoginError(data.message));
          alert(data.message);
        }
      } else {
        dispatch(setLoginError(data.message));
        alert(data.message);
      }
    });
  };
}

export function login(username, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(username, password, (data, error) => {
      dispatch(setLoginPending(false));
      if (!error) {
        console.log(data);
        if (data.success === true) {
          dispatch(setUserToken(data.token));
          dispatch(setLoginSuccess(true));
          //GET PROFILE INFORMATION, STORE IN REDUX STORE
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
              history.push("/home");
            })
            .catch(function(error) {
              alert(error);
              console.log("ERROR");
            });
        } else {
          dispatch(setLoginError(data.message));
          alert(data.message);
        }
      } else {
        dispatch(setLoginError(data.message));
        alert(data.message);
      }
    });
  };
}

export function logout() {
  return dispatch => {
    sessionStorage.removeItem("CWJWT");
    dispatch(setLoginSuccess(false));
    history.push("/");
  };
}

export function setLogged(input) {
  return dispatch => {
    dispatch(setLoginSuccess(input));
  };
}

//VERIFY THAT A USER IS LOGGED IN
export function verifyLoggedIn(redirect) {
  if (store.getState().auth.isLoginSuccess) {
    if (redirect) {
      history.push("/home");
    }
    return true;
  } else {
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
          store.dispatch(setLoginSuccess(true));
          if (redirect) {
            history.push("/home");
          }
          return true;
        })
        .catch(function(error) {
          alert(error);
          console.log("ERROR");
          return false;
        });
    } else {
      return false;
    }
  }
}

function setLoginPending(isLoginPending) {
  return {
    type: c.SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: c.SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: c.SET_LOGIN_ERROR,
    loginError
  };
}

function setUserToken(token) {
  return {
    type: c.SET_USER_TOKEN,
    token
  };
}

function callLoginApi(username, password, callback) {
  axios
    .post(host + "/api/user/login", {
      username: username,
      password: password
    })
    .then(response => {
      console.log(response);
      sessionStorage.setItem("CWJWT", response.data.token);
      return callback(response.data, null);
    })
    .catch(function(error) {
      console.log(null, error);
      return callback(null, new Error("Invalid email or password"));
    });
}

function callRegisterApi(userInfo, callback) {
  axios
    .post(host + "/api/user/register", {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      username: userInfo.username,
      email: userInfo.email,
      password: userInfo.password
    })
    .then(response => {
      console.log(response);
      sessionStorage.setItem("CWJWT", response.data.token);
      return callback(response.data, null);
    })
    .catch(function(error) {
      console.log(null, error);
      return callback(null, new Error("Invalid information"));
    });
}
