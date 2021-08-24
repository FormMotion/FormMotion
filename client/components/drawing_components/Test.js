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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

let headAndTorso = null;
let rightUpperArm = null;
let leftUpperArm = null;
let rightLowerArm = null;
let leftLowerArm = null;
let rightUpperLeg = null;
let leftUpperLeg = null;
let rightLowerLeg = null;
let leftLowerLeg = null;

const canvases = {
  headAndTorso,
  rightUpperArm,
  leftUpperArm,
  rightLowerArm,
  leftLowerArm,
  rightUpperLeg,
  leftUpperLeg,
  rightLowerLeg,
  leftLowerLeg,
};

let graph_paper = 'assets/graph-paper.png';

const Test = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState('#aabbcc');

  useEffect(() => {
    Object.keys(canvases).forEach((canvas) => {
      if (canvases[canvas] === null) {
        let currentCanvas = document.querySelector(`#${canvas}`);
        console.log(`${canvas}`);
        canvas = new Atrament(currentCanvas);
      }
      canvas.color = color;
    });
  }, [color]);

  function clear(e) {
    e.preventDefault();
    Object.keys(canvases).forEach((canvas) => {
      canvas.clear();
    });
  }

  function setThickness(e) {
    Object.keys(canvases).forEach((canvas) => {
      canvas.weight = parseFloat(e.target.value);
    });
  }

  function chooseMode(e) {
    Object.keys(canvases).forEach((canvas) => {
      canvas.mode = e.target.value;
    });
  }

  // function downloadDrawing(e) {
  //   e.preventDefault();
  //   const uri = sketchpad.toImage();
  //   const link = document.createElement('a');
  //   link.download = 'myCharacter.png';
  //   link.href = uri;
  //   console.log(link, 'link');
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  const handleExport = (e) => {
    e.preventDefault();
    Object.keys(canvases).forEach((canvas) => {
      let uri = canvas.toImage();
      localStorage.setItem(`playerDrawn${canvas}`, uri);
    });
    props.history.push('./platform');
  };

  // for logged-in user
  // const saveToGame = async (e) => {
  //   e.preventDefault(0);
  //   const playerDrawnCharacter = sketchpad.toImage();
  //   await props.saveImage(playerDrawnCharacter);
  // };

  return (
    <div>
      <div
        width={500}
        height={800}
        style={{
          borderStyle: 'solid',
          borderColor: 'black',
          backgroundImage: `url(${graph_paper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <canvas
          id="leftUpperArm"
          width="70"
          height="170"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        ></canvas>
        <canvas
          id="headAndTorso"
          width="280"
          height="400"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        ></canvas>
        <canvas
          id="rightUpperArm"
          width="70"
          height="170"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        ></canvas>
        <canvas
          id="leftLowerArm"
          width="70"
          height="180"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        ></canvas>
        <canvas
          id="rightLowerArm"
          width="70"
          height="180"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        ></canvas>
        <canvas
          id="leftLowerLeg"
          width="140"
          height="200"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        ></canvas>
        <canvas
          id="leftUpperLeg"
          width="280"
          height="200"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        ></canvas>
        <canvas
          id="rightLowerLeg"
          width="140"
          height="200"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        ></canvas>
        <canvas
          id="rightUpperLeg"
          width="280"
          height="200"
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        ></canvas>
      </div>
      {/* <Button variant="contained" onClick={downloadDrawing}>
        Download image to my local computer
      </Button> */}
      <Button variant="contained" onClick={handleExport}>
        Save character and choose platform
      </Button>
      <Button onClick={clear}>clear</Button>
      <br />
      <Typography id="non-linear-slider" gutterBottom>
        Thickness
      </Typography>
      <br />
      <Slider min={1} max={40} onChange={setThickness} step={0.1} />
      <br />
      <Typography>Mode</Typography>
      <FormControl className={classes.formControl}>
        <NativeSelect
          onChange={chooseMode}
          name="age"
          className={classes.selectEmpty}
          // inputProps={{ 'aria-label': 'age' }}
        >
          <option value={'draw'}>Draw</option>
          <option value={'fill'}>Fill</option>
          <option value={'erase'}>Erase</option>
          <option value={'disable'}>Disabled</option>
        </NativeSelect>
        <FormHelperText>Draw, fill or erase</FormHelperText>
      </FormControl>
      <Typography>Color</Typography>
      <HexColorPicker color={color} onChange={setColor} />
      <br />
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    saveImage: (dataUrl) => dispatch(saveImageThunk(dataUrl)),
  };
};

export default connect(null, mapDispatch)(Test);
