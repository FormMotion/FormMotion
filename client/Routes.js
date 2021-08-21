import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import About from './components/About';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Drawing2 from './components/drawing_components/Drawing2';

class Routes extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Welcome} />
          {/* <Route path='/home' exact component={Home} /> */}
          <Route path="/about" component={About} />
          <Route path="/drawing" component={Drawing2} />
        </Switch>
      </div>
    );
  }
}

const mapState = () => ({});
const mapDispatch = () => ({});
export default withRouter(connect(mapState, mapDispatch)(Routes));
