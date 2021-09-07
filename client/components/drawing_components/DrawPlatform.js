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
import Button from '@material-ui/core/Button';


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
  }, []);


  const [desertMountainButtonColor, setDesertMountainButtonColor] = useState('#D3D3D3')
  const [mysteriousForestButtonColor, setMysteriousForestButtonColor] = useState('#D3D3D3')
  const [snowCoveredMountainsButtonColor, setsnowCoveredMountainsButtonColor] = useState('#D3D3D3')


  const addPurpleMountains = () => {
    localStorage.setItem('purpleMountains', 'true')
    localStorage.setItem('mysteriousForest', 'false')
    localStorage.setItem('snowCoveredMountains', 'false')
    setDesertMountainButtonColor('#D9E6A1')
    setMysteriousForestButtonColor('#D3D3D3')
    setsnowCoveredMountainsButtonColor('#D3D3D3')

  }

  const addMysteriousForest = () => {
    localStorage.setItem('mysteriousForest', 'true')
    localStorage.setItem('purpleMountains', 'false')
    localStorage.setItem('snowCoveredMountains', 'false')
    setMysteriousForestButtonColor('#D9E6A1')
    setDesertMountainButtonColor('#D3D3D3')
    setsnowCoveredMountainsButtonColor('#D3D3D3')
  }

  const addSnowCoveredMountains = () => {
    localStorage.setItem('snowCoveredMountains', 'true')
    localStorage.setItem('mysteriousForest', 'false')
    localStorage.setItem('purpleMountains', 'false')
    setsnowCoveredMountainsButtonColor('#D9E6A1')
    setDesertMountainButtonColor('#D3D3D3')
    setMysteriousForestButtonColor('#D3D3D3')
  }

  return (
    <div>
      <NavBar />
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Grid>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box mt={12}>
              <Grid>
                <Typography align='center' style={{ fontWeight: 500 }}>
                  Your platform
                </Typography>
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid>
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
              <Grid>
                <Typography align='center' style={{ fontWeight: 500 }}>
                  Your prize
                </Typography>
              </Grid>
            </Box>
            <Box m={3}>
              <Grid>
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
            <Box mt={12}>
              <Grid>
                <Typography align='center' style={{ fontWeight: 500 }}>
                  Choose Your Background
                </Typography>
              </Grid>

              <Button
              style={{ backgroundColor: desertMountainButtonColor, margin: 10 }}
              variant='contained'
              onClick={addPurpleMountains}
            >
              Purple Desert Mountains
            </Button>

            <Button
              style={{ backgroundColor: mysteriousForestButtonColor, margin: 10 }}
              variant='contained'
              onClick={addMysteriousForest}
            >
              Mysterious Forest
            </Button>

            <Button
              style={{ backgroundColor: snowCoveredMountainsButtonColor, margin: 10 }}
              variant='contained'
              onClick={addSnowCoveredMountains}
            >
              Snow Covered Mountains
            </Button>

            </Box>
            <Box m={3}>
              <Grid>

              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid>
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
