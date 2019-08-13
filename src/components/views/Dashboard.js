import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';

import store from '../../redux/store';
import history from '../../history';
import { logout } from '../../actions/auth-actions';

import NavBar from '../NavBar';
import { Home } from './Home';


import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { faEnvelope, faChevronLeft, faChevronRight, faBars, faMailBulk, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

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

  
  return (
    <div>
      < NavBar />
      <Button onClick={toggleDrawer('left', true)}><FontAwesomeIcon icon={faBars} size="2x" /></Button>
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
    </div>
  );
}

//TO DO: ACCEPT DASHBOARD VARIABLE FROM STATE, CHANGE CLOSE DRAWER