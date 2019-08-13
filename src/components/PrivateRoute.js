import React from 'react'
import {Route, Redirect} from "react-router-dom"
import store from '../redux/store'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        store.getState().isLoginSuccess
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )