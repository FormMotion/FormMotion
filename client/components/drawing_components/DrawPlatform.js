import React, { useState, useEffect } from 'react';
const Atrament = require('atrament');
import DrawingTools from './DrawingTools';
import NavBar from '../NavBar';

import StandingAvatar from '../merge_components/MergeMain';
import LandingAvatar from '../merge_components/Landing';
import ForwardMovement from '../merge_components/ForwardMovement';
import JumpingMovement from '../merge_components/JumpingMovement.js';
import Slime from '../merge_components/Slime';

// material-ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

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
    <div>
      <NavBar />
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Grid Item>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box mt={12}>
              <Grid Item>
                <Typography align='center' style={{ fontWeight: 500 }}>
                  Your platform
                </Typography>
              </Grid>
            </Box>
            <Box mt={3}>
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
            </Box>
            <Box mt={12}>
              <Grid Item>
                <Typography align='center' style={{ fontWeight: 500 }}>
                  Your prize
                </Typography>
              </Grid>
            </Box>
            <Box m={3}>
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
            </Box>
          </Grid>
        </Grid>
        <Grid Item>
          <DrawingTools
            canvases={canvases}
            names={names}
            history={props.history}
            type="platformAndPrize"
          />
        </Grid>
      </Grid>
      {/* This is here so that the merged avatars are loaded into localStorage before we get to the game */}
      <StandingAvatar />
      <LandingAvatar />
      <ForwardMovement />
      <JumpingMovement />
      <Slime />
    </div >
  );
};

export default DrawPlatform;
