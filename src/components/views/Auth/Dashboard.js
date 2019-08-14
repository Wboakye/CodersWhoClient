import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import history from '../../../history';
import { logout } from '../../../actions/auth-actions';

import NavBar from '../../NavBars/NavBar';
import { Home } from './Home';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
//import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { faEnvelope, faBars, faMailBulk, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

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
//COMPONENT START 
export default function Dashboard() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,

  });

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
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <FontAwesomeIcon icon={faMailBulk} /> : <FontAwesomeIcon icon={faEnvelope} />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <FontAwesomeIcon icon={faMailBulk} /> : <FontAwesomeIcon icon={faEnvelope} />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </ListItemIcon>
            <ListItemText primary={'Sign Out'} />
        </ListItem>
      </List>
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
                    <Route path="/" component={Home} />
                    <Route path="/*" component={() => 'NOT FOUND'} />
                </Switch>
            </Router>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

