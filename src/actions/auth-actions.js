import axios from 'axios'

import * as c from '../redux/constants'

const host = 'http://localhost:3005';
//const host = process.env.API_HOST;

export function login(username, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(username, password, () => {
      console.log("Logged in")
    });
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
  }
}

function setUserToken(token) {
  return {
    type: c.SET_USER_TOKEN,
    token
  }
}

function callLoginApi(username, password, callback) {
  axios.post(host + '/api/user/login', {
    username: username,
    password: password
  })
  .then(function (response) {
    console.log(response)
    callback()
    return dispatch => {
      dispatch(setUserToken(response.data));
      dispatch(setLoginPending(false));
      dispatch(setLoginSuccess(true));
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
