import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import Routers from './route';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;
