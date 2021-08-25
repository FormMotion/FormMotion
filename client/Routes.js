import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import About from './components/About';
import Welcome from './components/Welcome';
import Drawing from './components/drawing_components/Drawing.js';
import oneDrawing from './components/drawing_components/oneDrawing.js';
import Game from './components/Game';
import Platform from './components/drawing_components/Platform.js';
import Merge from './components/merge_components/MergeMain.js'

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
          <Route path="/oneDrawing" component={oneDrawing} />
          <Route path="/merge" component={Merge} /> {/** For dev purposes */}
        </Switch>
      </div>
    );
  }
}

const mapState = () => ({});
const mapDispatch = () => ({});
export default withRouter(connect(mapState, mapDispatch)(Routes));
