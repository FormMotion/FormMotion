import '../public/style.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';

import Home from './components/Home';
import Navbar from './components/Navbar'
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
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

export default App;
