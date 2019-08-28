import axios from 'axios'

import history from '../history'

import * as c from '../redux/constants'
import store from '../redux/store'

//const host = 'http://localhost:3005';
//const host = process.env.API_HOST;


export function toggleOpenSidebar(isOpen) {
    store.dispatch(setSidebar(isOpen));
}

export function setSidebar(setSidebar) {
  return {
    type: c.SET_SIDEBAR,
    setSidebar
  }
}

export function setUser(setUser) {
  return {
    type: c.SET_USER,
    setUser
  }
}

