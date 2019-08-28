import React from 'react';
import { Router, Route, Switch, withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import history from '../../../history';
import { logout } from '../../../actions/auth-actions';

import { theme } from '../../theme'
import NavBar from '../../navbars/NavBar';

import { Home } from './Home';
import NewsTicker from '../../NewsTicker'
import UserProfile from './UserProfile'

import { ThemeProvider } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { faHome, faBars, faSignOutAlt, faSearchDollar} from '@fortawesome/free-solid-svg-icons'
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
  let userInfo = store.getState().user.userInfo;
  const profile = `/user/profile/${userInfo._id}`
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,

  });

  //DRAWER FUNCTIONALITY
  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const handleLogout = () => {
    store.dispatch(logout());
  }


  const sideList = side => (
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
      <Link to="/user" style={{ textDecoration: 'none', color: 'black' }}>
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
            {sideList('left')}
          </Drawer>
          <Provider store={store}>
            <Router history={history}>
                <Switch>
                  <Home />
                    <Route path="/profile/:id" component={UserProfile} />
                    <Route exact path="/" component={Home} />
                    <Route path="/*" component={() => 'NOT FOUND'} />
                </Switch>
            </Router>
        </Provider>
        {/* < NewsTicker /> */}
      </ThemeProvider>
    </div>
  );
}

export default withRouter(Dashboard);

