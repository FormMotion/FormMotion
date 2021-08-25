import React, { useState, useEffect, useRef } from 'react';
const Atrament = require('atrament');
import { connect } from 'react-redux';
import { saveImageThunk } from '../../redux/actions';
import { HexColorPicker } from 'react-colorful';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  specialTypography: {
    fontFamily: [
      'Klee One',
      'cursive',
    ].join(','),
    fontWeight: 600,
  },
}));

let sketchpad = null;
let graph_paper = 'assets/graph-paper.png';

const oneDrawing = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState('#aabbcc');
  const [drawnChar, setDrawnChar] = useState(true);
  const [thickness, setThickness] = useState(7);

  if (!drawnChar) {
    graph_paper = 'assets/eyeChar.png';
  }

  useEffect(() => {
    if (sketchpad === null) {
      const canvas = document.querySelector('#sketchpad');
      sketchpad = new Atrament(canvas);
    }
    sketchpad.color = color;
  }, [color]);

  function clear(e) {
    e.preventDefault();
    sketchpad.clear();
  }

  function setThicknessOnState(e, data) {
    e.preventDefault();
    setThickness(data);
    sketchpad.weight = parseFloat(data);
  }

  function chooseMode(e) {
    if (drawnChar) {
      sketchpad.mode = e.target.value;
    }
  }

  function downloadDrawing(e) {
    e.preventDefault();
    const uri = sketchpad.toImage();
    const link = document.createElement('a');
    link.download = 'myCharacter.png';
    link.href = uri;
    console.log(link, 'link');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = (e) => {
    e.preventDefault();
    if (drawnChar) {
      const uri = sketchpad.toImage();
      localStorage.setItem('playerDrawnCharacter', uri);
    } else {
      localStorage.setItem('playerDrawnCharacter', false);
    }
    props.history.push('./platform');
  };

  const useDefaultCharacter = (e) => {
    e.preventDefault();
    sketchpad.clear();
    setDrawnChar(false);
    sketchpad.mode = 'disabled';
  };

  const drawCharacter = (e) => {
    e.preventDefault();
    setDrawnChar(true);
    sketchpad.mode = 'draw';
  };

  const saveToGame = async (e) => {
    e.preventDefault(0);
    const playerDrawnCharacter = sketchpad.toImage();
    await props.saveImage(playerDrawnCharacter);
  };

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
          id="sketchpad"
          width="500"
          height="800"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
            backgroundImage: `url(${graph_paper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></canvas>
      </Grid>
      <Grid Item>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid Item>
            <Typography id="non-linear-slider" className={classes.specialTypography} style={{ margin: 15 }} justifyContent="center" gutterBottom>
              Thickness
            </Typography>
            <Slider
              min={1}
              max={40}
              value={thickness}
              onChange={setThicknessOnState}
              step={0.1}
            />
          </Grid>
          <Grid Item>
            <Typography className={classes.specialTypography} style={{ margin: 15 }} align="center">Mode</Typography>
            <FormControl className={classes.formControl}>
              <NativeSelect
                onChange={chooseMode}
                name="age"
                className={classes.selectEmpty}
                style={{ margin: 5 }}
              // inputProps={{ 'aria-label': 'age' }}
              >
                <option value={'draw'}>Draw</option>
                <option value={'fill'}>Fill</option>
                <option value={'erase'}>Erase</option>
                {/* <option value={'disable'}>Disabled</option> */}
              </NativeSelect>
              <FormHelperText>Draw, fill or erase</FormHelperText>
            </FormControl>
          </Grid>
          <Grid Item>
            <Typography style={{ margin: 15 }} align="center" className={classes.specialTypography}>Color</Typography>
            <HexColorPicker style={{ margin: 15 }} color={color} onChange={setColor} />
          </Grid>
          <Grid Item>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid Item>
                {drawnChar && (
                  <Button style={{ backgroundColor: '#d9e6a1', margin: 5 }} variant="contained" onClick={useDefaultCharacter}>
                    Use default character
                  </Button>
                )}
              </Grid>
              <Grid Item>
                {!drawnChar && (
                  <Button style={{ backgroundColor: '#ebc460', margin: 10 }} variant="contained" onClick={drawCharacter}>
                    Draw character
                  </Button>
                )}
              </Grid>
              <Grid Item>
                <Button style={{ backgroundColor: '#60a8eb', margin: 10 }} variant="contained" onClick={downloadDrawing}>
                  Download
                </Button>
              </Grid>
              <Grid Item>
                <Button style={{ backgroundColor: '#86995a', margin: 10 }} variant="contained" onClick={handleExport}>
                  Next
                </Button>
              </Grid>
              <Grid Item>
                <Button style={{ backgroundColor: '#eb6069', margin: 10 }} variant="contained" onClick={clear}>Clear</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatch = (dispatch) => {
  return {
    saveImage: (dataUrl) => dispatch(saveImageThunk(dataUrl)),
  };
};

export default connect(null, mapDispatch)(oneDrawing);
