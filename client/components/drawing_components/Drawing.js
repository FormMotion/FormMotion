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

let canvas_image = 'assets/graph-paper.png';

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

const names = {
  head: 'head',
  torso: 'torso',
  rightUpperArm: 'right upper arm',
  leftUpperArm: 'left upper arm',
  rightLowerArm: 'right lower arm',
  leftLowerArm: 'left lower arm',
  rightUpperLeg: 'right upper leg',
  leftUpperLeg: 'left upper leg',
  rightLowerLeg: 'right lower leg',
  leftLowerLeg: 'left lower leg',
};

const wholeBody = {
  0: 'assets/single-chars/graph-paper.png',
  1: 'assets/single-chars/eyeChar.png',
  2: 'assets/single-chars/flamingoOnePiece.png',
  3: 'assets/single-chars/temp_char_facing_left_run.png',
  4: 'assets/surpriseBox.jpeg',
};

// Object.keys(canvases).forEach((canvas) => {
//   canvas = {
//     value: null,
//     image: 'assets/graph-paper.png',
//   };
// });

// let canvas_image_head = 'assets/graph-paper.png';
// let canvas_image_torso = 'assets/graph-paper.png';
// let canvas_image_rightUpperArm = 'assets/graph-paper.png';
// let canvas_image_leftUpperArm = 'assets/graph-paper.png';
// let canvas_image_rightLowerArm = 'assets/graph-paper.png';
// let canvas_image_leftLowerArm = 'assets/graph-paper.png';
// let canvas_image_rightUpperLeg = 'assets/graph-paper.png';
// let canvas_image_rightLowerLeg = 'assets/graph-paper.png';
// let canvas_image_leftUpperLeg = 'assets/graph-paper.png';
// let canvas_image_lefttLowerLeg = 'assets/graph-paper.png';

const Drawing = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState('#aabbcc');
  const [thickness, setThickness] = useState(7);
  const [allDefault, setAllDefault] = useState(0);
  const [defaultChoices, setDefaultChoices] = useState({});
  // const [defaulttorso, setDefaulttorso] = useState(0);
  // const [defaultrightUpperArm, setDefaultrightUpperArm] = useState(0);
  // const [defaultrightLowerArm, setDefaultrightLowerArm] = useState(0);
  // const [defaultleftUpperArm, setDefaultleftUpperArm] = useState(0);
  // const [defaultleftLowerArm, setDefaultleftLowerArm] = useState(0);
  // const [defaultrightUpperLeg, setDefaultrightUpperLeg] = useState(0);
  // const [defaultrightLowerLeg, setDefaultrightLowerLeg] = useState(0);
  // const [defaultleftUpperLeg, setDefaultleftUpperLeg] = useState(0);
  // const [defaultleftLowerLeg, setDefaultleftLowerLeg] = useState(0);

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
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }

  function clear(e) {
    e.preventDefault();
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
      if (defaultChoices[canvas] === '0') {
        canvases[canvas].mode = e.target.value;
      }
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
  const chooseDefault = (e) => {
    let choice = e.target.value;
    // if the user chooses 0, they're choosing to draw.
    // set defaultChar to 0 and put the graph paper image in
    // and allow them to draw
    if (choice === '0') {
      setAllDefault(0);
      Object.keys(canvases).forEach((canvas) => {
        canvases[canvas].mode = 'draw';
        canvases[
          canvas
        ].canvas.style.backgroundImage = `url(assets/graph-paper.png)`;
      });
    }
    // if the user chooses to use a default character, set the default,
    // disable the drawing and clear the sketchpad, and set the
    // appropraite image as the canvas image (random is a surprise box image)
    if (choice > 0) {
      setAllDefault(choice);
      Object.keys(canvases).forEach((canvas) => {
        canvases[canvas].clear();
        canvases[canvas].mode = 'disabled';
        console.log(canvases[canvas].canvas, 'attempt');
        canvases[
          canvas
        ].canvas.style.backgroundImage = `url(assets/group-chars/flamingo-lad/${canvas}.png)`;
      });
    }
  };

  const chooseDefaultOrDraw = (e) => {
    let choiceAndCanvas = e.target.value.split(',');
    let choice = choiceAndCanvas[0];
    let canvas = choiceAndCanvas[1];
    console.log(choice, canvas, 'choice, canvas', canvases[canvas]);
    // if the user chooses 0, they're choosing to draw.
    // set defaultChar to 0 and put the graph paper image in
    // and allow them to draw
    if (choice === '0') {
      setDefaultChoices({ ...defaultChoices, canvas: choice });
      canvases[canvas].mode = 'draw';
      canvases[
        canvas
      ].canvas.style.backgroundImage = `url(assets/graph-paper.png)`;
    }
    // if the user chooses to use a default character, set the default,
    // disable the drawing and clear the sketchpad, and set the
    // appropraite image as the canvas image (random is a surprise box image)
    if (choice > 0) {
      setDefaultChoices({ ...defaultChoices, canvas: choice });
      canvases[canvas].clear();
      canvases[
        canvas
      ].canvas.style.backgroundImage = `url(assets/group-chars/flamingo-lad/${canvas}.png)`;
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
    // if the user has chosen a full default image, convert it to url
    // and put it in local storage (if they chose a random one, get a random number first)
    let choice;
    if (allDefault === 4) {
      setAllDefault(getRandomChar());
    }
    if (allDefault !== 0) {
      choice = allDefault;
      setDataUrl(wholeBody[choice], (dataURL) => {
        localStorage.setItem('playerDrawnCharacter', dataURL);
        props.history.push('./platform');
      });
    } else {
      // for each of the canvases,
      Object.keys(canvases).forEach((canvas) => {
        // if the user hasn't chosen a default for this canvas and they've drawn on it,
        // put their drawing in local storage
        if (
          (!defaultChoices[canvas] || defaultChoices[canvas] === '0') &&
          canvases[canvas].isDirty()
        ) {
          const uri = canvas.toImage();
          localStorage.setItem(`playerDrawn${canvas}`, uri);
        }

        // if the user hasn't chosen a default for this canvas OR drawn on it,
        // or they've chosen to receive a random default, set their choice to a random default
        else if (
          ((!defaultChoices[canvas] || defaultChoices[canvas] === '0') &&
            canvases[canvas].isDirty()) ||
          defaultChoices[canvas] === '4'
        ) {
          setDefaultChoices({ ...defaultChoices, canvas: getRandomChar() });
        }

        // set the choice equal to the default chosen, convert it to dataUrl, and set it in local storage
        choice = defaultChoices[canvas];
        setDataUrl(`assets/group-chars/flamingo-lad/${canvas}`, (dataURL) => {
          localStorage.setItem(`playerDrawn${canvas}`, dataURL);
        });
      });
      // move on to the next page after looping through the canvases
      props.history.push('./platform');
    }
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
  console.log('alldefault', allDefault);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
      spacing={4}
    >
      <Grid Item>
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
                backgroundImage: `url(${canvas_image})`,
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
                backgroundImage: `url(${canvas_image})`,
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
                backgroundImage: `url(${canvas_image})`,
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
                backgroundImage: `url(${canvas_image})`,
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
                backgroundImage: `url(${canvas_image})`,
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
                backgroundImage: `url(${canvas_image})`,
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
                backgroundImage: `url(${canvas_image})`,
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
                backgroundImage: `url(${canvas_image})`,
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
                backgroundImage: `url(${canvas_image})`,
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
                backgroundImage: `url(${canvas_image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></canvas>
          </div>
        </div>
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
            <Typography>
              Draw or choose pre-drawn character (parts of the character)
            </Typography>
            <Typography>
              To avoid drawing anything and use entire pre-drawn character:
            </Typography>
            <FormControl className={classes.formControl}>
              <NativeSelect
                onChange={chooseDefault}
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
            <Typography>Draw or choose pre-drawn part of character</Typography>
          </Grid>
          <div>
            {(allDefault === '0' || allDefault === 0) && (
              <div>
                {Object.keys(canvases).map((canvas, index) => (
                  <Grid Item>
                    <FormControl key={index}>
                      <Typography>
                        Choose whether to draw the {names[canvas]} or use a
                        default:
                      </Typography>
                      <FormControl className={classes.formControl}>
                        <NativeSelect
                          onChange={chooseDefaultOrDraw}
                          className={classes.selectEmpty}
                        >
                          <option value={[0, canvas]}>Draw character</option>
                          <option value={[1, canvas]}>Eyes</option>
                          <option value={[2, canvas]}>Flamingo</option>
                          <option value={[3, canvas]}>Other</option>
                          <option value={[4, canvas]}>Surprise me!</option>
                        </NativeSelect>
                        <FormHelperText>
                          Draw, choose one of the provided options, or be
                          surprised!
                        </FormHelperText>
                      </FormControl>
                    </FormControl>
                  </Grid>
                ))}
              </div>
            )}
          </div>
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
                style={{ backgroundColor: '#86995a', margin: 10 }}
                variant="contained"
                onClick={handleExport}
              >
                Save character and choose platform
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
  );
};

const mapDispatch = (dispatch) => {
  return {
    saveImage: (name, dataUrl) => dispatch(saveImageThunk(name, dataUrl)),
  };
};

export default connect(null, mapDispatch)(Drawing);
