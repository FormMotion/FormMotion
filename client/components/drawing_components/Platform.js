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

let sketchpad = null;
let canvas_image = 'assets/graph-paper.png';

let platform = null;
let prize = null;

const Platform = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState('#aabbcc');
  const [defaultPlatform, setDefaultPlatform] = useState(0);
  const [defaultPrize, setDefaultPrize] = useState(0);
  // const [thickness, setThickness] = useState(7);

  let graph_paper_prize = 'assets/graph-paper.png';
  let graph_paper_platform = 'assets/graph-paper.png';

  const canvases = {
    prize,
    platform,
  };

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

  function setThickness(e) {
    platform.weight = parseFloat(e.target.value);
    prize.weight = parseFloat(e.target.value);
  }

  function chooseMode(e) {
    if (defaultPlatform === '0') {
      platform.mode = e.target.value;
    }
    if (defaultPrize === '0') {
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

  const chooseDrawOrDefaultPrize = (e) => {
    let choice = e.target.value;

    if (choice === '0') {
      setDefaultPrize(0);
      prize.mode = 'draw';
      prize.canvas.style.backgroundImage = canvas_image;
    } else {
      setDefaultPrize(choice);
      prize.clear();
      prize.mode = 'disabled';
      prize.canvas.style.backgroundImage = `assets/prizes/${choice}`;
    }
  };

  const chooseDrawOrDefaultPlatform = (e) => {
    let choice = e.target.value;

    if (choice === '0') {
      setDefaultPlatform(0);
      platform.mode = 'draw';
      platform.canvas.style.backgroundImage = canvas_image;
    } else {
      setDefaultPlatform(choice);
      platform.clear();
      platform.mode = 'disabled';
      platform.canvas.style.backgroundImage = `assets/platforms/${choice}`;
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

    canvases.forEach((canvas) => {
      let defaultCanvas =
        canvas === 'platform' ? defaultPlatform : defaultPrize;
      if (defaultCanvas !== '0' && canvas.isDirty()) {
        const uri = canvases[canvas].toImage();
        localStorage.setItem(`playerDrawn${canvas}`, uri);
      } else {
        let choice;
        if (
          (!canvas.isDirty() && defaultCanvas === '0') ||
          defaultCanvas === '4'
        ) {
          choice = getRandomChar();
        } else {
          choice = defaultCanvas;
        }
        // convert the image to dataURl and put in local storage
        setDataUrl(`assets/${canvas}s/${canvas}${choice}`, (dataURL) => {
          localStorage.setItem(`playerDrawn${canvas}`, dataURL);
        });
      }
    });
    props.history.push('./platform');
  };

  // KEEP THIS FOR THE FUTURE LOGGED IN USER!

  //   const saveToGame = async (e) => {
  //     e.preventDefault(0);
  //     const playerDrawnCharacter = sketchpad.toImage();
  //     await props.saveImage(playerDrawnCharacter);
  //   };

  return (
    <div>
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
      <form>
        <Typography>Draw or choose pre-drawn platform</Typography>
        <FormControl className={classes.formControl}>
          <NativeSelect
            onChange={chooseDrawOrDefaultPlatform}
            className={classes.selectEmpty}
          >
            <option value={0}>Draw prize</option>
            <option value={1}>Eyes</option>
            <option value={2}>Flamingo</option>
            <option value={3}>Other</option>
            <option value={4}>Surprise me!</option>
          </NativeSelect>
          <FormHelperText>
            Draw, choose one of the provided options, or be surprised!
          </FormHelperText>
        </FormControl>
        <button onClick={clearPlatform}>clear</button>
        <button onClick={downloadPlatform}>
          Download platform drawing to my local computer
        </button>
      </form>
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
      <form>
        <Typography>Draw or choose pre-drawn prize</Typography>
        <FormControl className={classes.formControl}>
          <NativeSelect
            onChange={chooseDrawOrDefaultPrize}
            className={classes.selectEmpty}
          >
            <option value={0}>Draw prize</option>
            <option value={1}>Eyes</option>
            <option value={2}>Flamingo</option>
            <option value={3}>Other</option>
            <option value={4}>Surprise me!</option>
          </NativeSelect>
          <FormHelperText>
            Draw, choose one of the provided options, or be surprised!
          </FormHelperText>
        </FormControl>
        <button onClick={clearPrize}>clear</button>
        <button onClick={downloadPrize}>
          Download prize drawing to my local computer
        </button>
      </form>
      <form>
        <button onClick={handleExport} style={{ backgroundColor: 'lightpink' }}>
          Save and play the game
        </button>
        <br />
        <label>Thickness</label>
        <br />
        <input
          type="range"
          min={1}
          max={40}
          onInput={setThickness}
          step={0.1}
        />
        <br />
        <label>Mode</label>

        <select onChange={chooseMode}>
          <option value="draw">Draw</option>
          <option value="fill">Fill</option>
          <option value="erase">Erase</option>
          <option value="disabled">Disabled</option>
        </select>
        <br />
        <label>Color</label>
        <HexColorPicker color={color} onChange={setColor} />
        <br />
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    saveImage: (dataUrl) => dispatch(saveImageThunk(dataUrl)),
  };
};

export default connect(null, mapDispatch)(Platform);
