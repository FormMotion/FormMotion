import React, { useState, useEffect, useRef } from 'react';
const Atrament = require('atrament');
import { connect } from 'react-redux';
import { saveImageThunk } from '../../redux/actions';
import { HexColorPicker } from 'react-colorful';

let sketchpad = null;
let graph_paper = 'assets/graph-paper.png';

const Drawing = (props) => {
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
    props.history.push('./platform');
  };

  const saveToGame = async (e) => {
    e.preventDefault(0);
    const playerDrawnCharacter = sketchpad.toImage();
    await props.saveImage(playerDrawnCharacter);
  };

  return (
    <div>
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
      <form>
        <button onClick={downloadDrawing}>
          Download image to my local computer
        </button>
        <button onClick={handleExport} style = {{backgroundColor:'lightpink'}}>Save character and choose platform</button>
        <button onClick={clear}>clear</button>
        <br />
        <label>Thickness</label>
        <br />
        <input
          type="range"
          min={1}
          max={80}
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

export default connect(null, mapDispatch)(Drawing);
