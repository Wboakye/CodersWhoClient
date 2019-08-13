import React, { useEffect, useState } from 'react'
import { Redirect} from "react-router-dom"
import store from '../redux/store'
import axios from 'axios';

const host = 'http://localhost:3005';


const PrivateRoute = ({component: Component, isAuthenticated, isLoading, ...rest }) => { 


    const [state, setState] = React.useState({
        isAuthenticated: false,
        isLoading: true
      });

      useEffect(() => {
        if(store.getState().auth.isLoginSuccess){
            setState({isAuthenticated: true, isLoading: false});
          }else{
            if(sessionStorage.getItem('CWJWT')){
              let token = sessionStorage.getItem('CWJWT');
              axios({
                url: host + '/api/user/authenticate',
                method: 'POST',
                headers: {
                  'auth-token': token,
                },
              }).then( (response) => {
                  setState({...state, isAuthenticated: response.data.success});
                  setState({...state, isLoading: false});
              })
              .catch(function (error) {
                alert(error);
                setState({isLoading: false});
              });
            }else{
              setState({...state, isLoading: false });
            }
          }
      }, []);

           if(state.isLoading) {
            }
            if(!store.getState().auth.isLoginSuccess) {
                return <Redirect to="/login" />
            }
            return <Component {...rest} /> 



} 

export { PrivateRoute }