import * as c from '../redux/constants'

export default function reducer(state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  token: null,
}, action) {
  switch (action.type) {
    case c.SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case c.SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case c.SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });

      case c.SET_USER_TOKEN:
      return Object.assign({}, state, {
        token: action.token
      });

    default:
      return state;
  }
}