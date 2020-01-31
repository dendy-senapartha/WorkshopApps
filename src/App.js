import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from './components';
import Nav from './navigation';
import store from './store';


const App = () => (
  <Provider store={store}>
    <StatusBar />
    <Nav />
  </Provider>
);

export default App;
