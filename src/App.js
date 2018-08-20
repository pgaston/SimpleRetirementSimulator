/*
e:
cd Dropbox/Projects/ssim
npm start

(to fix bug)
npm install 

*/
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'typeface-roboto'		// need 300,400,500 -- check to see it doesn't bring in kitchen sink...

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import simApp from './sim/store/reducers'
import AboutText from './sim/components/AboutText'
import OnePageView from './sim/components/OnePageView'

const theme = createMuiTheme();

// Redux - persist state to localstorage
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
const store = createStore(simApp, persistedState)
store.subscribe(()=>{ localStorage.setItem('reduxState', JSON.stringify(store.getState())) })


class App extends Component {
  state = { showDrawer: false }
  toggleDrawer = (open) => () => {
    this.setState({
      showDrawer: open,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
	        <AppBar position="static">
	          <Toolbar>
	            <IconButton color="inherit" aria-label="Menu"
	            	onClick={this.toggleDrawer(true)} >
	              <MenuIcon />
	            </IconButton>
	            <Typography variant="title" color="inherit">
	              Simple Retirement Visualization
	            </Typography>
	          </Toolbar>
	        </AppBar>
          	<OnePageView />

          	<Drawer open={this.state.showDrawer} onClose={this.toggleDrawer(false)} >
          		<AboutText />
	        </Drawer>

        </MuiThemeProvider>
      </Provider>
    );
  }
}

//<HomeWindow />

export default App;
