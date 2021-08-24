import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import About from './components/About';
import Welcome from './components/Welcome';
import Drawing from './components/drawing_components/Drawing.js';
import Game from './components/Game';
import Platform from './components/drawing_components/Platform.js';
import Merge from './components/merge_test/merge_test.js'

class Routes extends Component {
    constructor() {
        super();
    }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/about" component={About} />
          <Route path="/play" component={Drawing} />
          <Route path="/game" component={Game} />
          <Route path="/platform" component={Platform} />
          <Route path ="/merge" component={Merge} />
          {/**Merge route for dev purposes only - should be removed as soon as no longer needed. */}
        </Switch>
      </div>
    );
  }
}

const mapState = () => ({});
const mapDispatch = () => ({});
export default withRouter(connect(mapState, mapDispatch)(Routes));
