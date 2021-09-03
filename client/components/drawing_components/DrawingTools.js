import React, { useState, useEffect, useRef } from 'react';
const Atrament = require('atrament');
import { HexColorPicker } from 'react-colorful';
import DrawingCharacterModal from './drawing_modals/DrawingCharacterModal';
import DrawingPlatformModal from './drawing_modals/DrawingPlatformModal';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';

// start changes

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DrawingTools = (props) => {
  const canvases = props.canvases ?? [];
  const names = props.names ?? [];
  const { type } = props;

  const classes = useStyles();
  const [color, setColor] = useState('#aabbcc');
  const [thickness, setThickness] = useState(7);
  const [defaultChoices, setDefaultChoices] = useState({});
  const [advancedChecked, setAdvancedChecked] = React.useState(false);
  const [allDefault, setAllDefault] = useState('0');

  // for advanced options toggle
  const advancedToggleChecked = () => {
    setAdvancedChecked((prev) => !prev);
  };

  useEffect(() => {
    Object.keys(canvases).forEach((canvas) => {
      if (canvases[canvas] === null) {
        setDefaultChoices((prevDefault) => {
          return { ...prevDefault, [canvas]: '0' };
        });
      }
    });
    Object.keys(canvases).forEach((canvas) => {
      if (canvases[canvas] !== null) {
        canvases[canvas].color = color;
      }
    });
  }, [color]);

  function clear(e) {
    e.preventDefault();
    Object.keys(canvases).forEach((canvas) => {
      canvases[canvas].clear();
      // canvases[canvas].mode = 'draw';
      // canvases[
      //   canvas
      // ].canvas.style.backgroundImage = `url(assets/graph-paper.png)`;
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
      if (defaultChoices[canvas] === '0' || defaultChoices[canvas] === 0) {
        canvases[canvas].mode = e.target.value;
      }
    });
  }

  const chooseDefault = (e) => {
    let choice = e.target.value;
    // if the user chooses 0, they're choosing to draw.
    // set defaultChar to 0 and put the graph paper image in
    // and allow them to draw
    if (choice.toString() === '0') {
      setAllDefault('0');
      Object.keys(canvases).forEach((canvas) => {
        canvases[canvas].mode = 'draw';
        canvases[
          canvas
        ].canvas.style.backgroundImage = `url(assets/graph-paper.png)`;
        setDefaultChoices((prevDefault) => {
          return { ...prevDefault, [canvas]: '0' };
        });
      });
    }
    // if the user chooses to use a default character, set the default,
    // disable the drawing and clear the sketchpad, and set the
    // appropraite image as the canvas image (random is a surprise box image)
    else {
      setAllDefault(choice);
      Object.keys(canvases).forEach((canvas) => {
        canvases[canvas].clear();
        canvases[canvas].mode = 'disabled';
        if (choice === '4') {
          canvases[
            canvas
          ].canvas.style.backgroundImage = `url(assets/surpriseBox.jpeg)`;
        } else {
          canvases[canvas].canvas.style.backgroundImage =
            type === 'character'
              ? `url(assets/group-chars/${choice}/${canvas}.png)`
              : type === 'platformAndPrize'
                ? `url(assets/platforms-prizes/${choice}/${canvas}.png)`
                : `url(assets/single-chars/${choice}.png)`;
        }
        setDefaultChoices((prevChoices) => {
          return { ...prevChoices, [canvas]: choice };
        });
      });
    }
  };

  const chooseDefaultOrDraw = (e) => {
    let choiceAndCanvas = e.target.value.split(',');
    let choice = choiceAndCanvas[0];
    let canvas = choiceAndCanvas[1];
    setDefaultChoices((prevChoices) => {
      return { ...prevChoices, [canvas]: choice };
    });
    // if the user chooses 0, they're choosing to draw.
    // set defaultChar to 0 and put the graph paper image in
    // and allow them to draw
    if (choice === '0') {
      canvases[canvas].mode = 'draw';
      canvases[
        canvas
      ].canvas.style.backgroundImage = `url(assets/graph-paper.png)`;
    }
    // if the user chooses to use a default character, set the default,
    // disable the drawing and clear the sketchpad, and set the
    // appropraite image as the canvas image (random is a surprise box image)
    else {
      canvases[canvas].clear();
      canvases[canvas].mode = 'disabled';
      if (choice !== '4') {
        canvases[canvas].canvas.style.backgroundImage =
          type === 'character'
            ? `url(assets/group-chars/${choice}/${canvas}.png)`
            : type === 'platformAndPrize'
              ? `url(assets/platforms-prizes/${choice}/${canvas}.png)`
              : `url(assets/single-chars/${choice}.png)`;
      } else {
        canvases[
          canvas
        ].canvas.style.backgroundImage = `url(assets/surpriseBox.jpeg)`;
      }
    }
  };

  function setDataUrl(src, callback) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
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
    return Math.floor(Math.random() * 3 + 1);
  };

  const handleExport = (e) => {
    e.preventDefault();
    let count = 0;
    // if the user has chosen a full default image, convert it to url
    // and put it in local storage (if they chose a random one, get a random number first)
    let choice;
    // for each of the canvases,
    Object.keys(canvases).forEach((canvas) => {
      console.log(canvas, 'canvas');
      if (
        (defaultChoices[canvas] === '0' && !canvases[canvas].isDirty()) ||
        defaultChoices[canvas] === '4'
      ) {
        choice = getRandomChar().toString();
      } else {
        choice = defaultChoices[canvas];
      }
      // if the user hasn't chosen a default for this canvas and they've drawn on it,
      // put their drawing in local storage
      if (choice === '0' && canvases[canvas].isDirty()) {
        const uri = canvases[canvas].toImage();
        localStorage.setItem(
          `playerDrawn${canvas[0].toUpperCase() + canvas.slice(1)}`,
          uri
        );
        count++;
        if (count === 10 && type === 'character') {
          props.history.push('./platform');
        }
        if (count === 2 && type === 'platformAndPrize') {
          props.history.push('./game');
        }
        if (count === 1 && type === 'singleCharacter') {
          props.history.push('./platform');
        }
      }

      // if the user hasn't chosen a default for this canvas OR drawn on it,
      // or they've chosen to receive a random default, set their choice to a random default
      else {
        // set the choice equal to the default chosen, convert it to dataUrl, and set it in local storage
        const url =
          type === 'character'
            ? `assets/group-chars/${choice}/${canvas}.png`
            : type === 'platformAndPrize'
              ? `assets/platforms-prizes/${choice}/${canvas}.png`
              : `assets/single-chars/${choice}.png`;
        setDataUrl(url, (dataURL) => {
          localStorage.setItem(
            `playerDrawn${canvas[0].toUpperCase() + canvas.slice(1)}`,
            dataURL
          );
          count++;

          if (count === 10 && type === 'character') {
            props.history.push('./platform');
          }
          if (count === 2 && type === 'platformAndPrize') {
            props.history.push('./game');
          }
          if (count === 1 && type === 'singleCharacter') {
            props.history.push('./platform');
          }
        });
      }
    });
    // move on to the next page after looping through the canvases
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {type === 'platformAndPrize' && (
        <Box
          p={1}
          m={1}
          borderRadius={16}
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <Grid Container>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid Item>
                <Typography align="center" style={{ fontWeight: 500 }}>
                  Choose one of our pre-drawn platforms and prizes:
                </Typography>
              </Grid>
              {Object.keys(canvases).map((canvas, index) => (
                <Grid Item key={index}>
                  <FormControl>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        onChange={chooseDefaultOrDraw}
                        className={classes.selectEmpty}
                      >
                        <option value={[0, canvas]}>
                          Draw {names[canvas]}
                        </option>
                        <option value={[1, canvas]}>
                          iMan's {names[canvas]}
                        </option>
                        <option value={[2, canvas]}>
                          Skeletron's {names[canvas]}
                        </option>
                        <option value={[3, canvas]}>
                          Flora's {names[canvas]}
                        </option>
                        <option value={[4, canvas]}>Surprise me!</option>
                      </NativeSelect>
                      <FormHelperText>
                        Draw, choose a default, or be surprised!
                      </FormHelperText>
                    </FormControl>
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      )}
      {advancedChecked ? (
        <Grid Container>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Box
              p={1}
              m={1}
              borderRadius={16}
              style={{ backgroundColor: '#f5f5f5' }}
            >
              <Typography align='center' style={{ fontWeight: 500 }}>
                Choose some of our pre-drawn body parts:
              </Typography>
              <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
              >
                {Object.keys(canvases).map((canvas, index) => (
                  <Grid Item key={index}>
                    <FormControl>
                      <FormControl className={classes.formControl}>
                        <NativeSelect
                          onChange={chooseDefaultOrDraw}
                          className={classes.selectEmpty}
                        >
                          <option value={[0, canvas]}>
                            Draw {names[canvas]}
                          </option>
                          <option value={[1, canvas]}>iMan's {names[canvas]}</option>
                          <option value={[2, canvas]}>Skeletron's {names[canvas]}</option>
                          <option value={[3, canvas]}>Flora's {names[canvas]}</option>
                          <option value={[4, canvas]}>Surprise me!</option>
                        </NativeSelect>
                        <FormHelperText>
                          Draw, choose a default, or be surprised!
                        </FormHelperText>
                      </FormControl>
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <div>
          {type === 'character' && (
            <Box
              p={1}
              m={1}
              borderRadius={16}
              style={{ backgroundColor: '#f5f5f5' }}
            >
              <Grid Item>
                <Typography align="center" style={{ fontWeight: 500 }}>
                  Choose one of our pre-drawn avatars:
                </Typography>
                <FormControl className={classes.formControl}>
                  <NativeSelect
                    onChange={chooseDefault}
                    className={classes.selectEmpty}
                  >
                    <option value={0}>Draw character</option>
                    <option value={1}>iMan</option>
                    <option value={2}>Skeletron</option>
                    <option value={3}>Flora</option>
                    <option value={4}>Surprise me!</option>
                  </NativeSelect>
                  <FormHelperText>
                    Draw, choose one of the provided options, or be surprised!
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Box>
          )}
          <Box
            p={1}
            m={1}
            borderRadius={16}
            style={{ backgroundColor: '#f5f5f5' }}
          >
            <Grid Item>
              {type === 'character' ? (
                <Typography align="center" style={{ fontWeight: 500 }}>
                  Or draw your own avatar!
                </Typography>
              ) : (
                <Typography align="center" style={{ fontWeight: 500 }}>
                  Or draw your own platform and prize!
                </Typography>
              )}
            </Grid>
            <Grid Item>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="flex-start"
              >
                <Grid Item>
                  <Typography
                    style={{ margin: 15, fontWeight: 500 }}
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
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid Item>
                      <Typography
                        id="non-linear-slider"
                        className={classes.specialTypography}
                        style={{ margin: 15, fontWeight: 500 }}
                        align="center"
                        gutterBottom
                      >
                        <br></br>
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
                        style={{ fontWeight: 500 }}
                        align="center"
                      >
                        <br></br>
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
      <Grid Item>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Grid Item>
            <Button
              style={{ backgroundColor: '#D9E6A1', margin: 10 }}
              variant='contained'
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
          <Grid Item>
            {type === 'character' ? (
              <DrawingCharacterModal />
            ) : (
              <DrawingPlatformModal />
            )}
          </Grid>
        </Grid>
      </Grid>
      {type === 'character' && (
        <Grid Item>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
          >
            <Box
              p={1}
              m={1}
              borderRadius={16}
              style={{ backgroundColor: '#f5f5f5' }}
            >
              <Grid Item>
                {(allDefault === '0' || allDefault === 0) && (
                  <div>
                    <FormControlLabel
                      control={
                        <Switch
                          onChange={advancedToggleChecked}
                          color="primary"
                        />
                      }
                      label="Advanced options"
                    />
                  </div>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default DrawingTools;
