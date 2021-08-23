import React, { useState, useEffect, useRef } from 'react';
const Atrament = require('atrament');
import { connect } from 'react-redux';
import { saveImageThunk } from '../../redux/actions';
import { HexColorPicker } from 'react-colorful';

let sketchpad = null;

const Drawing = (props) => {
  const [color, setColor] = useState('#aabbcc');
  const [lines, updateLines] = useState([]);
  const [undoneLines, updateUndoneLines] = useState([]);

  if (sketchpad) {
    sketchpad.recordStrokes = true;
    sketchpad.addEventListener('strokerecorded', ({ stroke }) => {
      updateLines([...lines, stroke]);
    });

    // for future undo of fill:
    // sketchpad.addEventListener('fillstart', ({ x, y }) => {
    //   console.log('fill', x, y);
    // });
  }
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
    updateLines([]);
    updateUndoneLines([]);
  }

  function undo(e) {
    e.preventDefault();
    if (lines.length !== 0) {
      sketchpad.clear();
      sketchpad.recordStrokes = false;
      lines
        .filter((line, index) => index !== lines.length - 1)
        .forEach((i) => drawLine(i));
      const line = lines[lines.length - 1];
      updateLines(lines.filter((line, index) => index !== lines.length - 1));
      updateUndoneLines([...undoneLines, line]);
      sketchpad.recordStrokes = true;
    }
  }

  function redo(e) {
    e.preventDefault();
    if (undoneLines.length !== 0) {
      sketchpad.recordStrokes = false;
      sketchpad.clear();
      lines.forEach((line) => drawLine(line));
      drawLine(undoneLines[undoneLines.length - 1]);
      const line = undoneLines[undoneLines.length - 1];
      updateUndoneLines(
        undoneLines.filter((line, index) => index !== undoneLines.length - 1)
      );
      updateLines([...lines, line]);
      sketchpad.recordStrokes = true;
    }
  }

  // may use later:
  // const redraw = () => {
  //   console.log('i got here', alines.length);
  //   sketchpad.clear();
  //   lines.forEach((i) => drawLine(i));
  // };

  const drawLine = function (stroke) {
    sketchpad.mode = stroke.mode;
    sketchpad.weight = stroke.weight;
    sketchpad.color = stroke.color;
    const points = stroke.points.slice();
    const firstPoint = points.shift();
    sketchpad.beginStroke(firstPoint.x, firstPoint.y);
    let prevPoint = firstPoint;
    while (points.length > 0) {
      const point = points.shift();
      const { x, y } = sketchpad.draw(
        point.x,
        point.y,
        prevPoint.x,
        prevPoint.y
      );
      prevPoint = { x, y };
    }
    sketchpad.endStroke(prevPoint.x, prevPoint.y);
  };

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
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = (e) => {
    e.preventDefault();
    const uri = sketchpad.toDataURL();
    localStorage.setItem('playerDrawnCharacter', uri);
    history.push('./game');
  };

  const saveToGame = async (e) => {
    e.preventDefault(0);
    const playerDrawnCharacter = sketchpad.toImage();
    await props.saveImage(playerDrawnCharacter);
  };

  return (
    <div>
      <canvas id="sketchpad" width="500" height="500"></canvas>
      <form>
        <button onClick={downloadDrawing}>
          Download image to my local computer
        </button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={handleExport}>Save character to game</button>
        <button onClick={clear}>clear</button>
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

export default connect(null, mapDispatch)(Drawing);
