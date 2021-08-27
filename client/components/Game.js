import React, { useState } from 'react';
import PhaserGame from './game_components/index.js';
import { CircularProgress } from '@material-ui/core';
import SaveDrawings from './drawing_components/SaveDrawings';

export default function Game() {
  return (
    <div>
      <PhaserGame />
      <SaveDrawings />
    </div>
  );
}
