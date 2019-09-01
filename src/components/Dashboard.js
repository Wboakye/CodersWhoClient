import React from 'react';
import { Router, Route, Switch, withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import { Provider } from 'react-redux';

import store from '../redux/store';
import history from '../history';
import { logout } from '../actions/auth-actions';

import { theme } from './theme'
import NavBar from './navbars/NavBar';

import UserProfile from './views/Auth/UserProfile'
import { HomeUnauth } from './views/Unauth/HomeUnauth';
import { Home } from './views/Auth/Home'
import NewsTicker from './NewsTicker'
import CryptoNews from './views/Unauth/CryptoNews'
import {PrivateRoute} from './PrivateRoute'
import { Login } from './views/Unauth/Login'
import { Register } from './views/Unauth/Register'



import { ThemeProvider } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { faHome, faBars, faSignInAlt, faSignOutAlt, faSearchDollar} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


//COMPONENT START 
function Dashboard() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,

  });

  let userInfo = store.getState().user.userInfo;
  const profile = `/profile/${userInfo._id}`

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const handleLogout = () => {
    store.dispatch(logout());
  }


  const sideListUnauth = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
            <ListItemText primary={<h4><b>Coders Who...</b></h4>}/>
          </ListItem>
        </List>
      <List>
      <Divider />
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faHome} />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
          </ListItem>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faSignInAlt} />
              </ListItemIcon>
              <ListItemText style={{textDecoration: 'none'}} primary={'Sign In'} />
          </ListItem>
        </Link>
      <Divider />
        <ListItem>
          <ListItemText primary={<b>News</b>}/>
        </ListItem>
        <Divider />
        <Link to="/news/general" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faSearchDollar} />
              </ListItemIcon>
              <ListItemText primary={'Crypto'} />
          </ListItem>
        </Link>
        <Link to="/news/bitcoin" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faSearchDollar} />
              </ListItemIcon>
              <ListItemText primary={'Bitcoin'} />
          </ListItem>
        </Link>
        <Link to="/news/dogecoin" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faSearchDollar} />
              </ListItemIcon>
              <ListItemText primary={'Dogecoin'} />
          </ListItem>
        </Link>
        <Link to="/news/ethereum" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faSearchDollar} />
              </ListItemIcon>
              <ListItemText primary={'Ethereum'} />
          </ListItem>
        </Link>
        <Link to="/news/litecoin" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faSearchDollar} />
              </ListItemIcon>
              <ListItemText primary={'Litecoin'} />
          </ListItem>
        </Link>
        <Link to="/news/ripple" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faSearchDollar} />
              </ListItemIcon>
              <ListItemText primary={'Ripple'} />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );


  const sideListAuth = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
            <ListItemText primary={<h4><b>Digital Ticker</b></h4>}/>
          </ListItem>
        </List>
      <List>
      <Divider />
      <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faHome} />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
          </ListItem>
        </Link>
        <Link to={profile} style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faSearchDollar} />
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
          </ListItem>
        </Link>
        <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </ListItemIcon>
            <ListItemText primary={'Sign Out'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const toggleButton = () => (
  <IconButton
    edge="start"
    className={classes.menuButton}
    color="inherit"
    aria-label="open drawer"
    onClick={toggleDrawer('left', true)} 
  >
    <FontAwesomeIcon icon={faBars} />
  </IconButton>)

  return (
    <div>
        <ThemeProvider theme={theme}>
          < NavBar color="primary" btn={toggleButton} />
          <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
            {store.getState().auth.isLoginSuccess ? sideListAuth('left') : sideListUnauth('left')}
          </Drawer>
          <Provider store={store}>
            <div className='mt-5 pt-3'>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={HomeUnauth} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute path="/home" component={Home} />
                    <Route path="/profile/:userId" component={UserProfile} />
                    <Route path="/news/:subject" component={CryptoNews} />
                    <Route path="/*" component={() => 'NOT FOUND'} />
                </Switch>
            </Router>
            </div>
        </Provider>
        {/* < NewsTicker /> */}
      </ThemeProvider>
    </div>
  );
}

export default withRouter(Dashboard);

