import React, { useState } from "react";
import { Link } from 'react-router-dom'
import PhaserGame from "./game_components/index.js";
import Welcome from "../components/Welcome"
import { CircularProgress } from '@material-ui/core';
import SaveDrawings from './drawing_components/SaveDrawings';

export default function Game() {

  return (
    <div id="phaser-app">
      <PhaserGame />
      <a href="/">FormMotion Home</a>
      <SaveDrawings />
    </div>
  );
}
