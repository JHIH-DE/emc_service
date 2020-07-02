import React from 'react';
import clsx from 'clsx';
import { Router, Route, Link } from "react-router-dom";
import { makeStyles,useTheme } from '@material-ui/core/styles';
import { createBrowserHistory } from "history";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Search from '@material-ui/icons/Search';
import Dashboard from '@material-ui/icons/Dashboard';
import './App.less';

import EpidemicMonitor from "./pages/epidemic_monitor/epidemic_monitor";
import EpidemicManager from "./pages/epidemic_manager/epidemic_manager";
import EpidemicOverview from "./pages/epidemic_overview/epidemic_overview";

const drawerWidth = 240;
const history = createBrowserHistory();

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  // appBar: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: drawerWidth,
  // },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    paddingTop: '70px',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    paddingTop: '70px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" 
      className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <span> COVID-19 疫情監測中心 </span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Router history={history}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
          open={open}
        >
          {/* <div className={classes.toolbar} /> */}
          <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
          <Divider />
          <List>
            {/* <ListItem button component={Link} to="/" >
              <ListItemIcon><Info /></ListItemIcon>
              <ListItemText>關於 COVID-19</ListItemText>
            </ListItem> */}
            <ListItem button component={Link} to="/epidemic_overview">
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText>世界疫情總覽</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/epidemic_monitor">
              <ListItemIcon><Search /></ListItemIcon>
              <ListItemText>各國疫情查詢</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/epidemic_manager">
            <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText>台灣感染者登錄</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
          <Route exact path="/" component={EpidemicOverview} />
          <Route path="/epidemic_overview" component={EpidemicOverview} />
          <Route path="/epidemic_monitor" component={EpidemicMonitor} />
          <Route path="/epidemic_manager" component={EpidemicManager} />
        </main>
      </Router>
    </div>
  );
}

export default App;


