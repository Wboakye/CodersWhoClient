import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'
import { login } from '../../reducers/auth-reducer';


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    let value = event.target.value
    event.target.name === 'username' ? 
    this.setState({ username: value }) : 
    this.setState({ password: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username, password } = this.state;
    this.props.login(username, password);
    this.setState({
      username: '',
      password: ''
    });
  }


  render(){
    let {username, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    console.log(this.props)
    return (
      
      <Container component="main" maxWidth="xs">

        <Box mt={8}>
        <Paper className='p-5'>
        <FontAwesomeIcon className="mb-3" style={{color: "#F40057"}}icon={faLock} size="4x" />

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth 
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <div className="message">
                { isLoginPending && <div>Please wait...</div> }
                { isLoginSuccess && <div>Success.</div> }
                { loginError && <div>{loginError.message}</div> }
              </div>
            </Grid>
          </form>
        </Paper>
        
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);