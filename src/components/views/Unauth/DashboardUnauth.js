import React from 'react';
import { Router, Route, Switch, withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import history from '../../../history';

import { theme } from '../../theme'
import NavBarUnauth from '../../navbars/NavBarUnauth';

import { HomeUnauth } from './HomeUnauth';
import NewsTicker from '../../NewsTicker'
import CryptoNews from './CryptoNews'

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

import { faHome, faBars, faSignInAlt, faSearchDollar} from '@fortawesome/free-solid-svg-icons'
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
function DashboardUnauth() {
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
          < NavBarUnauth color="primary" btn={toggleButton} />
          <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
            {sideList('left')}
          </Drawer>
          <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={HomeUnauth} />
                    <Route path="/news/:subject" component={CryptoNews} />
                    <Route path="/*" component={() => 'NOT FOUND'} />
                </Switch>
            </Router>
        </Provider>
        < NewsTicker />
      </ThemeProvider>
    </div>
  );
}

export default withRouter(DashboardUnauth);

