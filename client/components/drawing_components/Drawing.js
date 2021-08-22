import React, { useState, useEffect } from 'react';
const Atrament = require('atrament');
import { connect } from 'react-redux';
import { saveImageThunk } from '../../redux/actions';
import { HexColorPicker } from 'react-colorful';

const canvas = document.querySelector('#sketchpad');
const sketchpad = new Atrament(canvas);

const Drawing = (props) => {
  const [color, setColor] = useState('#aabbcc');
  const [lines, updateLines] = useState([]);
  const [undoneLines, updateUndoneLines] = useState([]);
  const alines = [];
  const aundoneLines = [];

  sketchpad.recordStrokes = true;
  sketchpad.addEventListener('strokerecorded', ({ stroke }) => {
    console.log(stroke, 'STROKE');
    // await updateLines([...lines, stroke]);
    alines.push(stroke);
    console.log(alines, 'alines');
    // console.log('lines', lines);
    console.log('this is the length of alines', alines.length);
  });

  useEffect(() => {
    sketchpad.color = color;
  }, [color]);

  function clear(e) {
    e.preventDefault();
    sketchpad.clear();
  }

  function undo(e) {
    e.preventDefault();
    console.log('this is the length of alines', alines.length);
    if (alines.length !== 0) {
      // const line = lines[lines.length - 1];
      aundoneLines.push(alines.pop());
      // updateLines(lines.filter((line, index) => index !== lines.length - 1));
      // updateUndoneLines([...undoneLines, line]);
      redraw();
    }
  }

  function redo(e) {
    e.preventDefault();
    if (aundoneLines.length !== 0) {
      alines.push(aundoneLines.pop());
      // const line = undoneLines[undoneLines.length - 1];
      // updateUndoneLines(
      //   undoneLines.filter((line, index) => index !== undoneLines.length - 1)
      // );
      // updateLines([...lines, line]);
      redraw();
    }
  }

  const redraw = () => {
    console.log('i got here');
    sketchpad.clear();
    alines.forEach((i) => drawLine(i));
  };

  const drawLine = function (stroke) {
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
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    saveImage: (dataUrl) => dispatch(saveImageThunk(dataUrl)),
  };
};

export default connect(null, mapDispatch)(Drawing);
