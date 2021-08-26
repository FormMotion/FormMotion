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
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  specialTypography: {
    fontFamily: ['Klee One', 'cursive'].join(','),
    fontWeight: 600,
  },
}));

let sketchpad = null;
let canvas_image = 'assets/graph-paper.png';

const images = {
  0: 'assets/single-chars/graph-paper.png',
  1: 'assets/single-chars/eyeChar.png',
  2: 'assets/single-chars/flamingoOnePiece.png',
  3: 'assets/single-chars/temp_char_facing_left_run.png',
  4: 'assets/surpriseBox.jpeg',
};

const oneDrawing = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState('#aabbcc');
  const [defaultChar, setDefaultChar] = useState(0);
  const [thickness, setThickness] = useState(7);

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
    if (defaultChar === '0') {
      sketchpad.mode = e.target.value;
    }
  }

  function downloadDrawing(e) {
    e.preventDefault();
    const uri = sketchpad.toImage();
    const link = document.createElement('a');
    link.download = 'myCharacter.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const chooseDrawOrDefault = (e) => {
    let choice = e.target.value;
    // if the user chooses 0, they're choosing to draw.
    // set defaultChar to 0 and put the graph paper image in
    // and allow them to draw
    if (choice === '0') {
      setDefaultChar(0);
      sketchpad.mode = 'draw';
      canvas_image = images[choice];
    }
    // if the user chooses to use a default character, set the default,
    // disable the drawing and clear the sketchpad, and set the
    // appropraite image as the canvas image (random is a surprise box image)
    if (choice > 0) {
      setDefaultChar(choice);
      sketchpad.clear();
      sketchpad.mode = 'disabled';
      canvas_image = images[choice];
    }
  };

  function setDataUrl(src, callback) {
    const img = new Image();
    // img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL();
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      img.src = src;
    }
  }

  // get a random number between 1 and 3
  const getRandomChar = () => {
    return Math.floor(Math.random() * 4 + 1);
  };

  const handleExport = (e) => {
    e.preventDefault();
    // if the user hasn't chosen a default character and they've drawn on the canvas,
    // put their drawing in local storage
    if (defaultChar === '0' && sketchpad.isDirty()) {
      const uri = sketchpad.toImage();
      localStorage.setItem('playerDrawnCharacter', uri);
      props.history.push('./platform');
      // if the user hasn't chosen a default character OR drawn on the canvas,
      // choose a random default character
    } else {
      let choice;
      if (
        (!sketchpad.isDirty() && defaultChar === '0') ||
        defaultChar === '4'
      ) {
        choice = getRandomChar();
      } else {
        choice = defaultChar;
      }
      // convert the image to dataURl and put in local storage
      setDataUrl(images[choice], (dataURL) => {
        localStorage.setItem('playerDrawnCharacter', dataURL);
        props.history.push('./platform');
      });
    }
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
            backgroundImage: `url(${canvas_image})`,
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
            <Typography
              id="non-linear-slider"
              className={classes.specialTypography}
              style={{ margin: 15 }}
              justifyContent="center"
              gutterBottom
            >
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
            <Typography>Draw or choose pre-drawn character</Typography>
            <FormControl className={classes.formControl}>
              <NativeSelect
                onChange={chooseDrawOrDefault}
                className={classes.selectEmpty}
              >
                <option value={0}>Draw character</option>
                <option value={1}>Eyes</option>
                <option value={2}>Flamingo</option>
                <option value={3}>Other</option>
                <option value={4}>Surprise me!</option>
              </NativeSelect>
              <FormHelperText>
                Draw, choose one of the provided options, or be surprised!
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid Item>
            <Typography
              className={classes.specialTypography}
              style={{ margin: 15 }}
              align="center"
            >
              Mode
            </Typography>
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
            <Typography
              style={{ margin: 15 }}
              align="center"
              className={classes.specialTypography}
            >
              Color
            </Typography>
            <HexColorPicker
              style={{ margin: 15 }}
              color={color}
              onChange={setColor}
            />
          </Grid>
          <Grid Item>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid Item>
                <Button
                  style={{ backgroundColor: '#60a8eb', margin: 10 }}
                  variant="contained"
                  onClick={downloadDrawing}
                >
                  Download
                </Button>
              </Grid>
              <Grid Item>
                <Button
                  style={{ backgroundColor: '#86995a', margin: 10 }}
                  variant="contained"
                  onClick={handleExport}
                >
                  Next
                </Button>
              </Grid>
              <Grid Item>
                <Button
                  style={{ backgroundColor: '#eb6069', margin: 10 }}
                  variant="contained"
                  onClick={clear}
                >
                  Clear
                </Button>
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
