import axios from 'axios'

import history from '../history'

import * as c from '../redux/constants'
import store from '../redux/store'

const host = 'http://localhost:3005';
//const host = process.env.API_HOST;


//LOGIN
export function login(username, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(username, password, (data, error) => {
      dispatch(setLoginPending(false));
      if (!error) {
        console.log(data);
        if(data.success === true){
          dispatch(setUserToken(data.token));
          dispatch(setLoginSuccess(true));
          history.push('/dashboard');
        }else{
          dispatch(setLoginError(data.message));
          alert(data.message);
        }
      } else {
        dispatch(setLoginError(data.message));
        alert(data.message);
      }
    });
  }
}

export function logout(){
  return dispatch => {
    sessionStorage.removeItem('CWJWT');
    dispatch(setLoginSuccess(false));
    history.push('/login');
  }
}

export function verifyLoggedIn(){
  if(!store.getState().isLoginSuccess === true ){
    return false
  }else{
    return true
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
  .then( (response) => {
    console.log(response)
    sessionStorage.setItem('CWJWT', response.data.token);
    return callback(response.data, null);
  })
  .catch(function (error) {
    console.log(null, error);
    return callback(new Error('Invalid email and password'));
  });
}
