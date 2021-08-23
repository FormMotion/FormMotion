import React, { useState, useEffect, useRef } from 'react';
const Atrament = require('atrament');
import { connect } from 'react-redux';
import { saveImageThunk } from '../../redux/actions';
import { HexColorPicker } from 'react-colorful';

let platform = null;
let prize = null;
let graph_paper = 'assets/graph-paper.png';

const Platform = (props) => {
  const [color, setColor] = useState('#aabbcc');
  const [drawnPlatform, setDrawnPlatform] = useState(true);
  const [drawnPrize, setDrawnPrize] = useState(true);

  useEffect(() => {
    if (platform === null)  {
      const canvas = document.querySelector('#platform');
      platform = new Atrament(canvas);
    }
    platform.color = color;
    if (prize === null)  {
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
    platform.mode = e.target.value;
    prize.mode = e.target.value;
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
    if(drawnPlatform){
        const platformURI = platform.toImage();
        localStorage.setItem('playerDrawnPlatform', platformURI);
    } else {
        localStorage.setItem('playerDrawnPlatform', false);
    }

    if (drawnPrize){
        const prizeURI = prize.toImage();
        localStorage.setItem('playerDrawnPrize', prizeURI);
    } else {
        localStorage.setItem('playerDrawnPrize', false);
    }
    

    props.history.push('./game');
  };

  const useDefaultPlatform = () => {
    setDrawnPlatform(false)
  }
  
  const useDefaultPrize = () => {
    setDrawnPrize(false)
  }


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
          backgroundImage: `url(${graph_paper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></canvas>
      <form>
        <button onClick={useDefaultPlatform}>Use default platform</button>
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
          backgroundImage: `url(${graph_paper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></canvas>
       <form>
        <button onClick={useDefaultPrize}>Use default prize</button>
        <button onClick={clearPrize}>clear</button>
        <button onClick={downloadPrize}>
            Download prize drawing to my local computer
            </button>
      </form>
      <form>
        <button onClick={handleExport} style = {{backgroundColor:'lightpink'}}>Save and play the game</button>
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
