import React, { useEffect } from 'react'
import { Redirect} from "react-router-dom"
import store from '../../redux/store'
import axios from 'axios';
import { setUser } from '../../actions/user-actions'
import { setLogged } from '../../actions/auth-actions'

const jwtDecode = require('jwt-decode')

const host = 'http://localhost:3005';


const LogRegReroute = ({component: Component, isAuthenticated, isLoading, ...rest }) => { 


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

              }); 
      }

      const checkJwtAndValidate = (...rest) => {
        if(sessionStorage.getItem('CWJWT')){
          let token = sessionStorage.getItem('CWJWT');
          axios({
            url: host + '/api/user/authenticate',
            method: 'POST',
            headers: {
              'auth-token': token,
            },
          }).then( (response) => {
            //IF AUTHENTICATED, GET AND STORE INFO
            if(response.data.success === true){
                console.log('Token validated')

              getUser()
            }
              setState({...state, isAuthenticated: response.data.success});
              store.dispatch(setLogged(true));
              setState({...state, isLoading: false});
              console.log('redirecting')
              return <Redirect to="/home" /> 
          })
          .catch(function (error) {
            alert(error);

            setState({isLoading: false});
            return <Component {...rest} />
          });
        }else{
          setState({...state, isLoading: false });
          return <Component {...rest} />
        }
      }

      const validate = (...rest) => {
        //IF ALREADY AUTHENTICATED IN STORE, AUTHENTICATED
        if(store.getState().auth.isLoginSuccess){
          setState({isAuthenticated: true, isLoading: false});
          console.log('isAuthenticated true')
          return <Redirect to="/home" />
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
                return <Component {...rest} />
            }
            return <Redirect to="/home" />
} 

export { LogRegReroute }