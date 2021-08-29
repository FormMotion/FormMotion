import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import About from './components/About';
import Welcome from './components/Welcome';
import Drawing from './components/drawing_components/Drawing.js';
import oneDrawing from './components/drawing_components/oneDrawing.js';
import Game from './components/Game';
import DrawPlatform from './components/drawing_components/DrawPlatform.js';
import DownwardMovement from './components/merge_components/DownwardMovement';
import DrawCharacter from './components/drawing_components/DrawCharacter';

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
          <Route path="/play" component={DrawCharacter} />
          <Route path="/game" exact component={Game} />
          <Route path="/platform" component={DrawPlatform} />
          <Route path="/oneDrawing" component={oneDrawing} />
          <Route path="/merge" component={DownwardMovement} />
        </Switch>
      </div>
    );
  }
}

const mapState = () => ({});
const mapDispatch = () => ({});
export default withRouter(connect(mapState, mapDispatch)(Routes));
