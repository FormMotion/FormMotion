import React, { useState, useEffect } from 'react';

// material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const AccessDrawingsInGame = (props) => {
  function downloadImage(item) {
    let image =
      item === 'Character'
        ? localStorage.getItem('standingAvatar')
        : item === 'Prize'
        ? localStorage.getItem('playerDrawnPrize')
        : localStorage.getItem('playerDrawnPlatform');
    const link = document.createElement('a');
    link.download = `My_${item}.png`;
    link.href = image;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid Item>
          <Button
            style={{ backgroundColor: '#d9e6a1', margin: 5 }}
            onClick={() => downloadImage('Character')}
          >
            Download character
          </Button>
        </Grid>
        <Grid Item>
          <Button
            style={{ backgroundColor: '#d9e6a1', margin: 5 }}
            onClick={() => downloadImage('Platform')}
          >
            Download platform
          </Button>
        </Grid>
        <Grid Item>
          <Button
            style={{ backgroundColor: '#d9e6a1', margin: 5 }}
            onClick={() => downloadImage('Prize')}
          >
            Download prize
          </Button>
        </Grid>
        <Grid Item>
          <Button
            style={{ backgroundColor: 'teal', margin: 5 }}
            onClick={() => props.history.push('./play')}
          >
            Draw a new character
          </Button>
        </Grid>
        <Grid Item></Grid>
      </Grid>
      {/* <Grid Item>
        <Button
          style={{ backgroundColor: 'orange', margin: 5 }}
          onClick={}
        >
          Pause game
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default AccessDrawingsInGame;
