import React from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

require('dotenv/config');

const host = 'http://localhost:3005'
//const host = process.env.API_HOST;
console.log('local host ' + host)

export default class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
      usernameExists: '',
      emailExists: '',
      emailError: '',
      usernameError: '',
      password1Error: '',
      password2Error: '',
    }
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);

  }

  //STORES INPUT IN LOCAL STATE
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //CHECKS IF EMAIL/USERNAME ALREADY EXISTS
  checkExists = (event) => {
    const itemName = event.target.name;
    const item = event.target.value;

    axios.post(host + '/api/user/' + itemName + 'exists', 
    itemName === 'email' ? {email: item} : {username: item})
    .then((response) => {
      if(response.data === true){
        //IF RESPONSE TRUE: SET ERROR MESSAGE
        itemName === 'email' ? 
        this.setState({
          emailError: 'Email already exists'
        }) : 
        this.setState({
          usernameExists: 'Username already exists'
        })
      }else{
        //IF RESPONSE FALSE: SET NO OR REMOVE ERROR MESSAGE
        itemName === 'email' ? this.setState({
          emailExists: '',
        }) : this.setState({
          usernameExists: '',
        })
    }})
    .catch((error)=> {
      console.log(error);
    });
  }

  // CHECKS FOR VALID USER INPUTS, IF INVALID DISPLAYS ERROR MESSAGE
  validate = (event) => {

    //REGEX: AN UPPER, LOWER, AND NUMERIC 
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,100}$/
    
    //IF INPUT IS EMAIL CHECKS THAT IT CONTAINS "@" AND "."
    if(event.target.name === 'email'){
      if (this.state.email && (!this.state.email.includes('@') || 
        !this.state.email.includes('.'))) {
        this.setState({emailError: 'Invalid email'})
      }else{
        this.setState({emailError: ''})
      }
    }

    //IF INPUT IS FIRST PASSWORD, CHECKS THAT IT MATCHES REGEX
    if(event.target.name === 'password1'){
      if (this.state.password1 && !this.state.password1.match(passwordCheck)) {
        this.setState({password1Error: true})
      }else{
        this.setState({password1Error: false})
      }
    }

    //IF INPUT IS SECOND PASSWORD, CHECKS THAT IT MATCHES FIRST PASSWORD
    if(event.target.name === 'password2'){
      if(this.state.password2 && this.state.password1 !== this.state.password2){
        this.setState({password2Error: true})
      }else{
        this.setState({password2Error: false})
      }
    }
  }

  //VALIDATES EMAIL THEN CHECKS IF EMAIL EXISTS
  handleEmail = (event) => {
    this.validate(event)
    this.checkExists(event)
  }

  render(){
    return (
      <Container component="main" maxWidth="xs">
        <Box mt={8}>
          <Paper className='p-5'>
          <div className='row'>
              <div className="col text-center">
                <FontAwesomeIcon className="mb-3" icon={faLock} style={{color: "#4051B5"}} size="4x" />
                <Typography component="h1" variant="h5" className="mb-3">
                  Sign up
                </Typography>
              </div>
            </div>
            <form onSubmit={this.handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.usernameExists ? true : false}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label={this.state.usernameError ? this.state.usernameError : 'Username'}
                    name="username"
                    autoComplete="username"
                    onBlur={this.checkExists}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.emailExists || this.state.emailError ? true : false}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label={this.state.emailExists ||  this.state.emailError ? this.state.emailExists + this.state.emailError : 'Email Address'}
                    name="email"
                    autoComplete="email"
                    onBlur={this.handleEmail}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.password1Error ? true : false}
                    variant="outlined"
                    required
                    fullWidth
                    name="password1"
                    label='Password'
                    type="password"
                    id="password1"
                    autoComplete="current-password"
                    onBlur={this.validate}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.password2Error}
                    variant="outlined"
                    required
                    fullWidth
                    name="password2"
                    label={this.state.password2Error ? 'Passwords do not match' : 'Re-enter password'}
                    type="password"
                    id="password2"
                    autoComplete="current-password"
                    onBlur={this.validate}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                className="mt-3"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item className="mt-1">
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div className="error" style={{color: 'red', fontSize: '10'}}>{this.state.password1Error ? '*Password must contain: one lowercase letter, one uppercase letter, one numeric character, and be at least 6 characters in length.' : ''}</div>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Container>
    );
  }
}