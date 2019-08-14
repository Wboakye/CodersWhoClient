import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import NavBar from '../../NavBars/NavBarCreds'

import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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
import { login, verifyLoggedIn } from '../../../actions/auth-actions';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#3e3e45',
      main: '#18181e',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#add3db',
      main: '#7da2a9',
      dark: '#4f737a',
      contrastText: '#000000',
    },
  },
});


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //STORES INPUT IN LOCAL STATE
  handleChange = (event) => {
    let value = event.target.value
    event.target.name === 'username' ? 
    this.setState({ username: value }) : 
    this.setState({ password: value });
  }

  //RETRIEVES INPUT FROM STATE, DISPATCHES LOGIN ACTION
  handleSubmit(e) {
    e.preventDefault();
    let { username, password } = this.state;
    this.props.login(username, password);
  }

  componentWillMount(){
    this.props.verifyLoggedIn(true)
  }

  render(){
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return (
      <div>
        <NavBar />
      <Container component="main" maxWidth="xs">
        <ThemeProvider theme={theme}>
          <Box mt={3}>
            <Fade
            in={true}
            {...({ timeout: 750 })}
            >
              <Paper className='p-5'>
                <div className='row'>
                  <div className="col text-center">
                    <FontAwesomeIcon className="mb-3" style={{color: "#7da2a9"}} icon={faLock} size="4x" />

                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                  </div>
                </div>
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
                    color="secondary"

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
                    color="secondary"
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
                    color="secondary"
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    {/* <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid> */}
                    <Grid item className="mt-1">
                      <Link href="/register" variant="body2">
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
            </Fade>
          </Box>
        </ThemeProvider>
      </Container>
      </div>
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
    login: (username, password) => dispatch(login(username, password)),
    verifyLoggedIn
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);