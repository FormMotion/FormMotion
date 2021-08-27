import React, { useState, useEffect, useRef } from 'react';
const Atrament = require('atrament');
import { connect } from 'react-redux';
import { saveImageThunk } from '../../redux/actions';
import { HexColorPicker } from 'react-colorful';
import StandingAvatar from '../merge_components/MergeMain';
import LandingAvatar from '../merge_components/Landing';
import ForwardMovement from '../merge_components/ForwardMovement';
import DownwardMovement from '../merge_components/DownwardMovement.js';

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

let canvas_image = 'assets/graph-paper.png';

let platform = null;
let prize = null;

const canvases = {
  prize,
  platform,
};

const Platform = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState('#aabbcc');
  const [defaultPlatform, setDefaultPlatform] = useState(0);
  const [defaultPrize, setDefaultPrize] = useState(0);
  const [thickness, setThickness] = useState(7);

  useEffect(() => {
    Object.keys(canvases).forEach((canvas) => {
      if (canvases[canvas] === null) {
        let currentCanvas = document.querySelector(`#${canvas}`);
        canvases[canvas] = new Atrament(currentCanvas);
      }
      canvases[canvas].color = color;
    });
  }, [color]);

  function clearPlatform(e) {
    e.preventDefault();
    canvases.platform.clear();
  }

  function clearPrize(e) {
    e.preventDefault();
    canvases.prize.clear();
  }

  function setThicknessOnState(e, data) {
    e.preventDefault();
    setThickness(data);
    canvases.platform.weight = parseFloat(data);
    canvases.prize.weight = parseFloat(data);
  }

  function chooseMode(e) {
    Object.keys(canvases).forEach((canvas) => {
      let defaultCanvas =
        canvas === 'platform' ? defaultPlatform : defaultPrize;
      if (defaultCanvas === '0' || defaultCanvas === 0) {
        canvases[canvas].mode = e.target.value;
      }
    });
  }

  function downloadPlatform(e) {
    e.preventDefault();
    if (defaultPlatform.toString() === '0') {
      const uri = canvases.platform.toImage();

      const link = document.createElement('a');
      link.download = 'myPlatform.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  function downloadPrize(e) {
    e.preventDefault();
    if (defaultPrize.toString() === '0') {
      const uri = canvases.prize.toImage();
      const link = document.createElement('a');
      link.download = 'myPrize.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const chooseDrawOrDefaultPrize = (e) => {
    let choice = e.target.value;

    if (choice.toString() === '0') {
      setDefaultPrize('0');
      canvases.prize.mode = 'draw';
      canvases.prize.canvas.style.backgroundImage =
        'url(assets/graph-paper.png)';
    } else {
      setDefaultPrize(choice);
      canvases.prize.clear();
      canvases.prize.mode = 'disabled';
      canvases.prize.canvas.style.backgroundImage = `url(assets/prizes/prize${choice}.png)`;
    }
  };

  const chooseDrawOrDefaultPlatform = (e) => {
    let choice = e.target.value;

    if (choice.toString() === '0') {
      setDefaultPlatform('0');
      canvases.platform.mode = 'draw';
      canvases.platform.canvas.style.backgroundImage =
        'url(assets/graph-paper.png)';
    } else {
      setDefaultPlatform(choice);
      canvases.platform.clear();
      canvases.platform.mode = 'disabled';
      canvases.platform.canvas.style.backgroundImage = `url(assets/platforms/platform${choice}.png)`;
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

  function handleExport(e) {
    e.preventDefault();
    let count = 0;

    Object.keys(canvases).forEach((canvas) => {
      let defaultCanvas =
        canvas === 'platform' ? defaultPlatform : defaultPrize;
      if (defaultCanvas.toString() === '0' && canvases[canvas].isDirty()) {
        const uri = canvases[canvas].toImage();
        localStorage.setItem(
          `playerDrawn${canvas[0].toUpperCase() + canvas.slice(1)}`,
          uri
        );
        count++;
        if (count === 2) {
          props.history.push('./game');
        }
      } else {
        let choice;
        if (
          (!canvases[canvas].isDirty() && defaultCanvas.toString() === '0') ||
          defaultCanvas.toString() === '4'
        ) {
          choice = getRandomChar().toString();
        } else {
          choice = defaultCanvas;
        }
        // convert the image to dataURl and put in local storage
        setDataUrl(`assets/${canvas}s/${canvas}${choice}.png`, (dataURL) => {
          localStorage.setItem(
            `playerDrawn${canvas[0].toUpperCase() + canvas.slice(1)}`,
            dataURL
          );
          count++;
          if (count === 2) {
            props.history.push('./game');
          }
        });
      }
    });
    // props.history.push('./game');
  }

  // KEEP THIS FOR THE FUTURE LOGGED IN USER!

  //   const saveToGame = async (e) => {
  //     e.preventDefault(0);
  //     const playerDrawnCharacter = sketchpad.toImage();
  //     await props.saveImage(playerDrawnCharacter);
  //   };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
      spacing={2}
    >
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
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid Item>
            <Typography>Draw or choose pre-drawn platform</Typography>
            <FormControl className={classes.formControl}>
              <NativeSelect
                onChange={chooseDrawOrDefaultPlatform}
                className={classes.selectEmpty}
              >
                <option value={0}>Draw platform</option>
                <option value={1}>Platform 1</option>
                <option value={2}>Platform 2</option>
                <option value={3}>Platform 3</option>
                <option value={4}>Surprise me!</option>
              </NativeSelect>
              <FormHelperText>
                Draw, choose one of the provided options, or be surprised!
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid Item>
            <Button
              style={{ backgroundColor: '#d9e6a1', margin: 5 }}
              onClick={clearPlatform}
            >
              clear
            </Button>
          </Grid>
          <Grid Item>
            <Button
              style={{ backgroundColor: '#d9e6a1', margin: 5 }}
              onClick={downloadPlatform}
            >
              Download
            </Button>
          </Grid>
        </Grid>
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
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid Item>
            <Typography>Draw or choose pre-drawn prize</Typography>
            <FormControl className={classes.formControl}>
              <NativeSelect
                onChange={chooseDrawOrDefaultPrize}
                className={classes.selectEmpty}
              >
                <option value={0}>Draw prize</option>
                <option value={1}>Prize 1</option>
                <option value={2}>Prize 2</option>
                <option value={3}>Prize 3</option>
                <option value={4}>Surprise me!</option>
              </NativeSelect>
              <FormHelperText>
                Draw, choose one of the provided options, or be surprised!
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid Item>
            <Button
              style={{ backgroundColor: '#d9e6a1', margin: 5 }}
              variant="contained"
              onClick={clearPrize}
            >
              Clear
            </Button>
          </Grid>
          <Grid Item>
            <Button
              style={{ backgroundColor: '#d9e6a1', margin: 5 }}
              variant="contained"
              onClick={downloadPrize}
            >
              Download
            </Button>
          </Grid>
        </Grid>
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
            <Button
              style={{ backgroundColor: '#d9e6a1', margin: 5 }}
              variant="contained"
              onClick={handleExport}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* This is here so that the merged avatars are loaded into localStorage before we get to the game */}
      <StandingAvatar />
      <LandingAvatar />
      <ForwardMovement />
      <DownwardMovement />
    </Grid>
  );
};

const mapDispatch = (dispatch) => {
  return {
    saveImage: (dataUrl) => dispatch(saveImageThunk(dataUrl)),
  };
};

export default connect(null, mapDispatch)(Platform);
