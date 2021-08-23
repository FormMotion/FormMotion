import React, { useState, useEffect, useRef } from 'react';
const Atrament = require('atrament');
import { connect } from 'react-redux';
import { saveImageThunk } from '../../redux/actions';
import { HexColorPicker } from 'react-colorful';
import Draw from './draw';

const Drawing = (props) => {
  // const canvasRef = React.useRef(null);
  const [color, setColor] = useState('#aabbcc');
  const [lines, updateLines] = useState([]);
  const [undoneLines, updateUndoneLines] = useState([]);
  const alines = [];
  const aundoneLines = [];

  // let sketchpad = {}

  // sketchpad = atrament('#mySketcher', 800, 500, 'orange');
  const canvas = document.querySelector('#sketchpad');
  const sketchpad = new Atrament(canvas);

  sketchpad.recordStrokes = true;
  sketchpad.addEventListener('strokerecorded', ({ stroke }) => {
    updateLines([...lines, stroke]);
    console.log(stroke, 'STROKE');
    alines.push(stroke);
    console.log(alines, 'alines');
    console.log('lines', lines);
  });

  sketchpad.addEventListener('fillstart', ({ x, y }) => {
    console.log('fill', x, y);
  });

  useEffect(() => {
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
    console.log('i got to undo, and lines is', lines);
    if (lines.length !== 0) {
      sketchpad.clear();
      sketchpad.recordStrokes = false;
      lines
        .filter((line, index) => index !== lines.length - 1)
        .forEach((i) => drawLine(i));

      const line = lines[lines.length - 1];
      console.log('line', line);
      // aundoneLines.push(alines.pop());
      // console.log(alines, 'alines in undo');
      updateLines(lines.filter((line, index) => index !== lines.length - 1));

      updateUndoneLines([...undoneLines, line]);
      sketchpad.recordStrokes = true;

      // redraw();
    }
  }

  function redo(e) {
    e.preventDefault();
    console.log('i got to redo and lines is', lines);
    if (undoneLines.length !== 0) {
      // alines.push(aundoneLines.pop());

      sketchpad.recordStrokes = false;
      // redraw();
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

  // const redraw = () => {
  //   console.log('i got here', alines.length);
  //   sketchpad.clear();
  //   lines.forEach((i) => drawLine(i));
  // };

  const drawLine = function (stroke) {
    console.log('here in drawLine', stroke);
    sketchpad.mode = stroke.mode;
    sketchpad.weight = stroke.weight;
    sketchpad.color = stroke.color;
    // don't want to modify original data
    const points = stroke.points.slice();
    const firstPoint = points.shift();
    // beginStroke moves the "pen" to the given position and starts the path
    sketchpad.beginStroke(firstPoint.x, firstPoint.y);
    let prevPoint = firstPoint;
    while (points.length > 0) {
      const point = points.shift();

      // the `draw` method accepts the current real coordinates
      // (i. e. actual cursor position), and the previous processed (filtered)
      // position. It returns an object with the current processed position.
      const { x, y } = sketchpad.draw(
        point.x,
        point.y,
        prevPoint.x,
        prevPoint.y
      );
      // the processed position is the one where the line is actually drawn to
      // so we have to store it and pass it to `draw` in the next step
      prevPoint = { x, y };
    }
    // endStroke closes the path
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
      <canvas id="sketchpad" width="500" height="500"></canvas>
      {sketchpad && (
        <form>
          <button onClick={downloadDrawing}>
            Download image to my local computer
          </button>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
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
      )}
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    saveImage: (dataUrl) => dispatch(saveImageThunk(dataUrl)),
  };
};

export default connect(null, mapDispatch)(Drawing);
