import * as c from '../redux/constants'

export default function reducer(state = {
    userInfo: {},
    setSidebar: false
}, action) {
  switch (action.type) {

    case c.SET_SIDEBAR:
      return Object.assign({}, state, {
        setSidebar: action.setSidebar
      });

    case c.SET_USER:
      return Object.assign({}, state, {
        userInfo: action.setUser
      });

    default:
      return state;
  }
}