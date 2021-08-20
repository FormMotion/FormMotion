import '../public/style.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from "react-router-dom";


import Home from './components/Home';
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <Footer />
        <Home />
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>,
  </BrowserRouter>,
  document.getElementById('app')
);

export default App;
