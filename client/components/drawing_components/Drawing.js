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

// let head = { value: null, height: '150', width: '280' }
// let torso = { value: null, height: '250', width: '280' }
// let rightUpperArm = { value: null, height: '170', width: '70' }
// let leftUpperArm = { value: null, height: '170', width: '70' }
// let rightLowerArm = { value: null, height: '180', width: '70' }
// let leftLowerArm = { value: null, height: '180', width: '70' }
// let rightUpperLeg = { value: null, height: '200', width: '140' }
// let leftUpperLeg = { value: null, height: '200', width: '140' }
// let rightLowerLeg = { value: null, height: '200', width: '280' }
// let leftLowerLeg = { value: null, height: '200', width: '280' }

let head = null;
let torso = null;
let rightUpperArm = null;
let leftUpperArm = null;
let rightLowerArm = null;
let leftLowerArm = null;
let rightUpperLeg = null;
let leftUpperLeg = null;
let rightLowerLeg = null;
let leftLowerLeg = null;

const canvases = {
  head,
  torso,
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

const Drawing = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState('#aabbcc');
  const [thickness, setThickness] = useState(7);

  useEffect(() => {
    Object.keys(canvases).forEach((canvas) => {
      if (canvases[canvas] === null) {
        let currentCanvas = document.querySelector(`#${canvas}`);
        const parentName = `${canvas}`.toLowerCase();
        canvases[canvas] = new Atrament(currentCanvas);
        const parent = document.querySelectorAll(`.${parentName}`)[0];
        fitToContainer(canvases[canvas], parent);
      }
      canvases[canvas].color = color;
    });
  }, [color]);

  function fitToContainer(canvas, parent) {
    // Make it visually fill the positioned parent
    console.log(canvas, 'canvas');
    // ...then set the internal size to match

    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }

  function clear(e) {
    e.preventDefault();
    console.log(canvases, 'canvases');
    Object.keys(canvases).forEach((canvas) => {
      console.log(canvas, canvases[canvas]);
    });
    Object.keys(canvases).forEach((canvas) => {
      canvases[canvas].clear();
    });
  }

  function setThicknessOnState(e, data) {
    setThickness(data);
    Object.keys(canvases).forEach((canvas) => {
      canvases[canvas].weight = parseFloat(data);
    });
  }

  function chooseMode(e) {
    Object.keys(canvases).forEach((canvas) => {
      canvases[canvas].mode = e.target.value;
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

  //use for later?
  const handleExport = (e) => {
    e.preventDefault();
    Object.keys(canvases).forEach((canvas) => {
      let uri = canvases[canvas].toImage();
      localStorage.setItem(`playerDrawn${canvas}`, uri);
    });
    props.history.push('./platform');
  };

  // for logged-in user
  // const saveToGame = (e) => {
  //   e.preventDefault();
  //   Object.keys(canvases).forEach(async (canvas) => {
  //     const uri = canvases[canvas].toImage();
  //     await props.saveImage(`${canvas}`, uri);
  //   });
  //   props.history.push('./platform');
  // };

  return (
    <div>
      <div>
        {/* <div
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
      > */}
        {/* {Object.keys(canvases).forEach((canvas) => {
          <canvas
            id={canvas}
            width={canvas.width}
            height={canvas.height}
            style={{
              borderStyle: 'solid',
              borderColor: 'black',
              backgroundImage: `url(${graph_paper})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></canvas>
        } */}
        <div className="container">
          <div className="head">
            <canvas
              id="head"
              width="250"
              height="150"
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundImage: `url(${graph_paper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
          <div className="leftupperarm">
            <canvas
              id="leftUpperArm"
              width="100"
              height="170"
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundImage: `url(${graph_paper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
          <div className="rightupperarm">
            <canvas
              id="rightUpperArm"
              width="100"
              height="170"
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundImage: `url(${graph_paper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
          <div className="leftlowerarm">
            <canvas
              id="leftLowerArm"
              width="100"
              height="180"
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundImage: `url(${graph_paper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
          <div className="rightlowerarm">
            <canvas
              id="rightLowerArm"
              width="100"
              height="180"
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundImage: `url(${graph_paper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
          <div className="torso">
            <canvas
              id="torso"
              width="280"
              height="250"
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundImage: `url(${graph_paper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
          <div className="leftupperleg">
            <canvas
              id="leftUpperLeg"
              width="140"
              height="200"
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundImage: `url(${graph_paper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
          <div className="rightupperleg">
            <canvas
              id="rightUpperLeg"
              width="140"
              height="200"
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundImage: `url(${graph_paper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
          <div className="leftlowerleg">
            <canvas
              id="leftLowerLeg"
              width="140"
              height="200"
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundImage: `url(${graph_paper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
          <div className="rightlowerleg">
            <canvas
              id="rightLowerLeg"
              width="140"
              height="200"
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundImage: `url(${graph_paper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
        </div>
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
      <br />
      <Slider
        min={1}
        max={40}
        value={thickness}
        onChange={setThicknessOnState}
        step={0.1}
      />
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
    saveImage: (name, dataUrl) => dispatch(saveImageThunk(name, dataUrl)),
  };
};

export default connect(null, mapDispatch)(Drawing);
