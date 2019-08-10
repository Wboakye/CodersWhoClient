import React from 'react';
import axios from 'axios';


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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  checkExists = (event) => {
    const itemName = event.target.name;
    const item = event.target.value;
    console.log(itemName + ': ' + item)
    axios.post(host + '/api/user/' + itemName + 'exists', 
    itemName === 'email' ? {email: item} : {username: item})
    .then((response) => {
      console.log("Email exists?", response)
      if(response.data === true){
        itemName === 'email' ? 
        this.setState({
          emailError: 'Email already exists'
        }) : 
        this.setState({
          usernameExists: 'Email already exists'
        })
      }else{
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

  validate = (event) => {
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[A-Za-z\d@$#!|><}{/\///\\/.,+;:=/\\[~`()\]^_%*?&]{6,100}$/
   
    if(event.target.name === 'email'){
      if (this.state.email && (!this.state.email.includes('@') || 
        !this.state.email.includes('.'))) {
        this.setState({emailError: 'Invalid email'})
      }else{
        this.setState({emailError: ''})
      }
    }

    if(event.target.name === 'password1'){
      if (this.state.password1 && !this.state.password1.match(passwordCheck)) {
        this.setState({password1Error: true})
      }else{
        this.setState({password1Error: false})
      }
    }

    if(event.target.name === 'password2'){
      if(this.state.password2 && this.state.password1 !== this.state.password2){
        this.setState({password2Error: true})
      }else{
        this.setState({password2Error: false})
      }
    }
  }

  handleEmail = (event) => {
    this.validate(event)
    this.checkExists(event)
  }

  render(){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <FontAwesomeIcon className="mb-3" icon={faLock} size="4x" />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
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
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className="error" style={{color: 'red', fontSize: '10'}}>{this.state.password1Error ? '*Password must contain: one lowercase letter, one uppercase letter, one numeric character, one special character, and be at least 6 characters in length.' : ''}</div>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
        </Box>
      </Container>
    );
  }
}