import React, { useState, useEffect } from 'react';
const Atrament = require('atrament');
import { connect } from 'react-redux';
import { saveImageThunk } from '../../redux/actions';
import { HexColorPicker } from 'react-colorful';

const canvas = document.querySelector('#sketchpad');
const sketchpad = new Atrament(canvas);

const Drawing2 = (props) => {
  const [color, setColor] = useState('#aabbcc');

  useEffect(() => {
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

  // const handleExport = () => {
  //   const uri = stageRef.current.toDataURL();
  //   localStorage.setItem('playerDrawnCharacter', uri);
  // };

  const saveToGame = async (e) => {
    e.preventDefault(0);
    const playerDrawnCharacter = sketchpad.toImage();
    await props.saveImage(playerDrawnCharacter);
  };

  return (
    <div>
      <form>
        <button onClick={downloadDrawing}>
          Download image to my local computer
        </button>
        <button onClick={saveToGame}>Save character to game</button>
        <button onClick={clear}>clear</button>
        <br />
        <label>Thickness</label>
        <br />
        <input
          type="range"
          min={1}
          max={40}
          onInput={setThickness}
          // value={2}
          step={0.1}
        />
        <br />
        {/* <input
          id="adaptive"
          type="checkbox"
          onchange="atrament.adaptiveStroke = event.target.checked;"
          checked
          autocomplete="off"
        />
        <label for="adaptive">Adaptive stroke</label>
        <br /> */}
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

export default connect(null, mapDispatch)(Drawing2);
