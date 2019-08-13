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

    default:
      return state;
  }
}