import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import About from './components/About';
import Welcome from './components/Welcome';
import singleCharacterDrawing from './components/drawing_components/singleCharacterDrawing.js';
import Game from './components/Game';
import DrawPlatform from './components/drawing_components/DrawPlatform.js';
import JumpingMovement from './components/merge_components/JumpingMovement';
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
          <Route path="/oneDrawing" component={singleCharacterDrawing} />
          <Route path="/merge" component={JumpingMovement} />
        </Switch>
      </div>
    );
  }
}

const mapState = () => ({});
const mapDispatch = () => ({});
export default withRouter(connect(mapState, mapDispatch)(Routes));
