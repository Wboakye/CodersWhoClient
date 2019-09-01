import React, { useEffect, useState } from 'react'
import { Redirect} from "react-router-dom"
import store from '../redux/store'
import axios from 'axios';
import { setUser } from '../actions/user-actions'
import { setLogged } from '../actions/auth-actions'

const jwtDecode = require('jwt-decode')

const host = 'http://localhost:3005';


const PrivateRoute = ({component: Component, isAuthenticated, isLoading, ...rest }) => { 


    const [state, setState] = React.useState({
        isAuthenticated: false,
        isLoading: true
      });

      //GET USER INFO, SAVE IN STORE
      const getUser = () => {
        let token = sessionStorage.getItem('CWJWT');
          let decodedToken = jwtDecode(token)
              axios({
                url: host + '/api/user/profile',
                method: 'POST',
                headers: {
                  'auth-token': token,
                },
                data: { userId: decodedToken._id },
              }).then( (response) => {
                 store.dispatch(setUser(response.data.body));
              })
              .catch(function (error) {
                alert(error);
                console.log('ERROR')

              }); 
      }

      const checkJwtAndValidate = (...rest) => {
        if(sessionStorage.getItem('CWJWT')){
          console.log('Has JWT Authenticating')
          let token = sessionStorage.getItem('CWJWT');
          axios({
            url: host + '/api/user/authenticate',
            method: 'POST',
            headers: {
              'auth-token': token,
            },
          }).then( (response) => {
            console.log('Received response with JWT')
            //IF AUTHENTICATED, GET AND STORE INFO
            if(response.data.success === true){
              getUser()
            }
              console.log('Got user, authentication')                 
              setState({...state, isAuthenticated: response.data.success});
              store.dispatch(setLogged(true));
              console.log('set store auth complete')
              setState({...state, isLoading: false});
              return <Component {...rest} /> 
          })
          .catch(function (error) {
            alert(error);
            console.log('ERROR')

            setState({isLoading: false});
            return <Redirect to="/login" />
          });
        }else{
          console.log('No JWT Not Authenticated')
          setState({...state, isLoading: false });
          return <Redirect to="/login" />
        }
      }

      const validate = (...rest) => {
        //IF ALREADY AUTHENTICATED IN STORE, AUTHENTICATED
        if(store.getState().auth.isLoginSuccess){
          console.log('State authed logged in.')
          setState({isAuthenticated: true, isLoading: false});
          return <Component {...rest} /> 
        }else{
          //IF JWT AVAILABLE, VALIDATE
          checkJwtAndValidate();
        }
      }

      useEffect((...rest) => {
        validate(...rest);
      },state, []);

           if(state.isLoading) {
            }
            if(!store.getState().auth.isLoginSuccess) {
                console.log('auth returning to loggin')
                return <Redirect to="/login" />
            }
            return <Component {...rest} /> 
} 

export { PrivateRoute }