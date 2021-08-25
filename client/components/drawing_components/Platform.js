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

let platform = null;
let prize = null;

const Platform = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState('#aabbcc');
  const [drawnPlatform, setDrawnPlatform] = useState(true);
  const [drawnPrize, setDrawnPrize] = useState(true);
  const [thickness, setThickness] = useState(7);

  let graph_paper_prize = 'assets/graph-paper.png';
  let graph_paper_platform = 'assets/graph-paper.png';

  if (!drawnPrize) {
    graph_paper_prize = 'assets/eyePrize.png';
  }
  if (!drawnPlatform) {
    graph_paper_platform = 'assets/eyePlatform.png';
  }

  useEffect(() => {
    if (platform === null) {
      const canvas = document.querySelector('#platform');
      platform = new Atrament(canvas);
    }
    platform.color = color;
    if (prize === null) {
      const canvas = document.querySelector('#prize');
      prize = new Atrament(canvas);
    }
    prize.color = color;
  }, [color]);

  function clearPlatform(e) {
    e.preventDefault();
    platform.clear();
  }

  function clearPrize(e) {
    e.preventDefault();
    prize.clear();
  }

  // function setThickness(e) {
  //   platform.weight = parseFloat(e.target.value);
  //   prize.weight = parseFloat(e.target.value);
  // }
  function setThicknessOnState(e, data) {
    e.preventDefault();
    setThickness(data);
    platform.weight = parseFloat(data);
  }

  function chooseMode(e) {
    if (drawnPlatform) {
      platform.mode = e.target.value;
    }
    if (drawnPrize) {
      prize.mode = e.target.value;
    }
  }

  function downloadPlatform(e) {
    e.preventDefault();
    const uri = platform.toImage();
    const link = document.createElement('a');
    link.download = 'myPlatform.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadPrize(e) {
    e.preventDefault();
    const uri = prize.toImage();
    const link = document.createElement('a');
    link.download = 'myPrize.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = (e) => {
    e.preventDefault();
    if (drawnPlatform) {
      const platformURI = platform.toImage();
      localStorage.setItem('playerDrawnPlatform', platformURI);
    } else {
      localStorage.setItem('playerDrawnPlatform', false);
    }

    if (drawnPrize) {
      const prizeURI = prize.toImage();
      localStorage.setItem('playerDrawnPrize', prizeURI);
    } else {
      localStorage.setItem('playerDrawnPrize', false);
    }

    props.history.push('./game');
  };

  const useDefaultPlatform = (e) => {
    e.preventDefault();
    platform.clear();
    setDrawnPlatform(false);
    platform.mode = 'disabled';
  };

  const drawPlatform = (e) => {
    e.preventDefault();
    setDrawnPlatform(true);
    platform.mode = 'draw';
  };
  const useDefaultPrize = (e) => {
    e.preventDefault();
    prize.clear();
    setDrawnPrize(false);
    prize.mode = 'disabled';
  };

  const drawPrize = (e) => {
    e.preventDefault();
    setDrawnPrize(true);
    prize.mode = 'draw';
  };

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
            backgroundImage: `url(${graph_paper_platform})`,
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
            {drawnPlatform && (
              <Button style={{ backgroundColor: '#d9e6a1', margin: 5 }} onClick={useDefaultPlatform}>Use default platform</Button>
            )}
            {!drawnPlatform && (
              <Button style={{ backgroundColor: '#d9e6a1', margin: 5 }} onClick={drawPlatform}>Draw platform</Button>
            )}
          </Grid>
          <Grid Item>
            <Button style={{ backgroundColor: '#d9e6a1', margin: 5 }} onClick={clearPlatform}>clear</Button>
          </Grid>
          <Grid Item>
            <Button style={{ backgroundColor: '#d9e6a1', margin: 5 }} onClick={downloadPlatform}>
              Download
            </Button>
          </Grid>
        </Grid >
        <canvas
          id="prize"
          width="100"
          height="100"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
            backgroundImage: `url(${graph_paper_prize})`,
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
            {drawnPrize && (
              <Button style={{ backgroundColor: '#d9e6a1', margin: 5 }} variant="contained" onClick={useDefaultPrize}>Use default prize</Button>
            )}
          </Grid>
          <Grid Item>
            {!drawnPrize && <Button style={{ backgroundColor: '#d9e6a1', margin: 5 }} variant="contained" onClick={drawPrize}>Draw prize</Button>}
          </Grid>
          <Grid Item>
            <Button style={{ backgroundColor: '#d9e6a1', margin: 5 }} variant="contained" onClick={clearPrize}>Clear</Button>
          </Grid>
          <Grid Item>
            <Button style={{ backgroundColor: '#d9e6a1', margin: 5 }} variant="contained" onClick={downloadPrize}>
              Download
            </Button>
          </Grid>
        </Grid >
      </Grid >
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
            <Button style={{ backgroundColor: '#d9e6a1', margin: 5 }} variant="contained" onClick={handleExport}>
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid >
    </Grid >
  );
};

const mapDispatch = (dispatch) => {
  return {
    saveImage: (dataUrl) => dispatch(saveImageThunk(dataUrl)),
  };
};

export default connect(null, mapDispatch)(Platform);
