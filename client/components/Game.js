import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PhaserGame from './game_components/index.js';
import Welcome from '../components/Welcome';
import { CircularProgress } from '@material-ui/core';
import AccessDrawingsInGame from './drawing_components/AccessDrawingsInGame';

export default function Game(props) {
  return (
    <div id="phaser-app">
      <PhaserGame />
      <a href="/" id="gamescreenlink">
        <img src="/images/TransparentLogo.png" id="game_screen_logo" />
      </a>
      <AccessDrawingsInGame history={props.history} />
    </div>
  );
}
