import "../public/style.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div>
        <Routes />
        {/* <Footer /> */}
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById("app")
);

export default App;
