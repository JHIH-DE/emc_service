import React from 'react';
import { Router, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
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
import Info from '@material-ui/icons/Info';
import Search from '@material-ui/icons/Search';
import Dashboard from '@material-ui/icons/Dashboard';
import './App.less';

import EpidemicMonitor from "./pages/epidemic_monitor/epidemic_monitor";
import Introduction from "./pages/introduction/introduction";
import InfectedList from "./pages/epidemic_monitor/components/infected_list/infected_list";
import EpidemicOverview from "./pages/epidemic_overview/epidemic_overview";

const drawerWidth = 240;
const history = createBrowserHistory();

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
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
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    paddingTop: 80,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <span> COVID-19 疫情監測中心 </span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Router history={history}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
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
            <ListItem button component={Link} to="/infected_list">
            <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText>台灣感染者登錄</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <Route exact path="/" component={EpidemicOverview} />
          <Route path="/epidemic_overview" component={EpidemicOverview} />
          <Route path="/epidemic_monitor" component={EpidemicMonitor} />
          <Route path="/infected_list" component={InfectedList} />
        </main>
      </Router>
    </div>
  );
}

export default App;


