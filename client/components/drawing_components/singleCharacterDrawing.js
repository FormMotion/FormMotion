import React, { useState, useEffect } from 'react';
const Atrament = require('atrament');
import DrawingTools from './DrawingTools';

// material-ui
import Grid from '@material-ui/core/Grid';

let character = null;
let canvas_image = 'assets/graph-paper.png';

const canvases = {
  character,
};

const names = {
  character: 'character',
};
const singleCharacterDrawing = (props) => {
  useEffect(() => {
    Object.keys(canvases).forEach((canvas) => {
      if (canvases[canvas] === null) {
        let currentCanvas = document.querySelector(`#${canvas}`);
        canvases[canvas] = new Atrament(currentCanvas);
      }
    });
  });

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
      spacing={4}
    >
      <Grid Item>
        <canvas
          id="character"
          width="500"
          height="800"
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
      <div>
        <DrawingTools
          canvases={canvases}
          history={props.history}
          names={names}
          type="singleCharacter"
        />
      </div>
    </Grid>
  );
};

export default singleCharacterDrawing;
