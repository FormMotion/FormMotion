import React, { useState, useEffect } from 'react';
const Atrament = require('atrament');
import DrawingTools from './DrawingTools';
import DefaultOptions from './DefaultOptions';
import NavBar from '../NavBar';

import StandingAvatar from '../merge_components/MergeMain';
import LandingAvatar from '../merge_components/Landing';
import ForwardMovement from '../merge_components/ForwardMovement';
import JumpingMovement from '../merge_components/JumpingMovement.js';
import Slime from '../merge_components/Slime';

// material-ui
import Grid from '@material-ui/core/Grid';

let canvas_image = 'assets/graph-paper.png';

let platform = null;
let prize = null;

const canvases = {
  platform,
  prize,
};

const names = {
  platform: 'platform',
  prize: 'prize',
};

const DrawPlatform = (props) => {
  useEffect(() => {
    Object.keys(canvases).forEach((canvas) => {
      if (canvases[canvas] === null) {
        let currentCanvas = document.querySelector(`#${canvas}`);
        canvases[canvas] = new Atrament(currentCanvas);
      }
    });
  });

  return (
    <>
      <NavBar />
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Grid Item>
          <DrawingTools
            canvases={canvases}
            names={names}
            history={props.history}
            type="platformAndPrize"
          />
        </Grid>
        <Grid Item>
          <canvas
            id="platform"
            width="250"
            height="75"
            style={{
              borderStyle: 'solid',
              borderColor: 'black',
              backgroundImage: `url(${canvas_image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></canvas>
        </Grid>
        <Grid Item>
          <canvas
            id="prize"
            width="100"
            height="100"
            style={{
              borderStyle: 'solid',
              borderColor: 'black',
              backgroundImage: `url(${canvas_image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></canvas>
        </Grid>
        {/* <Grid Item>
          <DefaultOptions
            canvases={canvases}
            history={props.history}
            names={names}
            type="platformAndPrize"
          />
        </Grid> */}
        {/* This is here so that the merged avatars are loaded into localStorage before we get to the game */}
        <StandingAvatar />
        <LandingAvatar />
        <ForwardMovement />
        <JumpingMovement />
        <Slime />
      </Grid>
    </>
  );
};

export default DrawPlatform;
