import React, { useState, useEffect, useRef } from 'react';
const Atrament = require('atrament');
import { connect } from 'react-redux';
import { saveImageThunk } from '../../redux/actions';
import { HexColorPicker } from 'react-colorful';

import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
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

let sketchpad = null;
let graph_paper = 'assets/graph-paper.png';

const Drawing = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState('#aabbcc');

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

  function setThickness(e) {
    sketchpad.weight = parseFloat(e.target.value);
  }

  function chooseMode(e) {
    sketchpad.mode = e.target.value;
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
    const uri = sketchpad.toImage();
    localStorage.setItem('playerDrawnCharacter', uri);
    props.history.push('./game');
  };

  const saveToGame = async (e) => {
    e.preventDefault(0);
    const playerDrawnCharacter = sketchpad.toImage();
    await props.saveImage(playerDrawnCharacter);
  };

  return (
    <div>
      <Box alignItems="center" justifyContent="center">
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
      </Box>
      <Button variant="contained" onClick={downloadDrawing}>
        Download image to my local computer
      </Button>
      <Button variant="contained" onClick={handleExport}>Save character to game</Button>
      <Button variant="contained" onClick={clear}>clear</Button>
      <br />
      <Typography id="non-linear-slider" gutterBottom>
        Thickness
      </Typography>
      <br />
      <Slider
        min={1}
        max={40}
        onChage={setThickness}
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
          <option value={"draw"}>Draw</option>
          <option value={"fill"}>Fill</option>
          <option value={'erase'}>Erase</option>
          <option value={"disable"}>Disabled</option>
        </NativeSelect>
        <FormHelperText>Draw, fill or erase</FormHelperText>
      </FormControl>
      {/* <select onChange={chooseMode}>
          <option value="draw">Draw</option>
          <option value="fill">Fill</option>
          <option value="erase">Erase</option>
          <option value="disabled">Disabled</option>
        </select>
        <br /> */}
      <Typography>Color</Typography>
      <HexColorPicker color={color} onChange={setColor} />
      <br />
      {/* </form> */}
    </div >
  );
};

const mapDispatch = (dispatch) => {
  return {
    saveImage: (dataUrl) => dispatch(saveImageThunk(dataUrl)),
  };
};

export default connect(null, mapDispatch)(Drawing);
